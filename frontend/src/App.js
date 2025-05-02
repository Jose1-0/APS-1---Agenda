import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent, createEvent, updateEvent } from './services/api';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';
import EventModal from './components/EventModal/EventModal';
import AddEventModal from './components/AddEventModal/AddEventModal';
import './App.css';
import { registerForPush } from './utils/pushNotifications';

const App = () => {
  const [events, setEvents] = useState([]); // Guarda todos os eventos do calendário
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento clicado
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal de visualização
  const [addModalIsOpen, setAddModalIsOpen] = useState(false); // Modal de adicionar/editar
  const [view, setView] = useState('month'); // Visualização atual (mês, semana, etc.)
  const [date, setDate] = useState(new Date()); // Data atual exibida

  // Carregar eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents(); // Chama a API Django
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start), // Converte para objeto Date
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };
    fetchEvents();
    registerForPush();  // Registrar para notificações push
  }, []);

  // Abrir modal ao clicar em um evento
  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Armazena o evento clicado
    setModalIsOpen(true);    // Abre o modal de visualização
  };

  // Fechar modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null); // Limpa o evento selecionado ao fechar o modal
  };

  // Excluir evento
  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      closeModal();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  // Adicionar evento
  const handleAddEvent = async (newEvent) => {
    try {
      const response = await createEvent(newEvent);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  // Editar evento
  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await updateEvent(updatedEvent.id, updatedEvent); // usa o id do próprio evento
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? response.data : event
      );
      setEvents(updatedEvents);
      closeModal();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  const handleSelectDate = (selectedDate) => {
    const newEvent = {
      title: '',
      start: selectedDate,
      end: selectedDate,
    };
    console.log("Criando novo evento:", newEvent);
    setSelectedEvent(newEvent);
    setAddModalIsOpen(true);
  };

  return (
    <div className="app">
      <CalendarComponent
        events={events}
        onSelectEvent={handleSelectEvent}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        onSelectDate={handleSelectDate}
      />
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        onEdit={() => {
          setAddModalIsOpen(true); // Abre o modal de edição
          setSelectedEvent(prev => ({ ...prev })); // força reuso do mesmo evento com id
        }}
      />
      <AddEventModal
        isOpen={addModalIsOpen}
        onRequestClose={() => {
          setAddModalIsOpen(false); // Fecha o modal
          setSelectedEvent(null); // Limpa o evento selecionado
        }}
        onSave={(eventData) =>  {
          if (eventData.id) {
            handleEditEvent(eventData);
          } else {
            handleAddEvent(eventData);
          }
        }}
        event={selectedEvent}
      />
    </div>
  );
};

export default App;