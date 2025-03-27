import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent, createEvent, updateEvent } from './services/api';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';
import EventModal from './components/EventModal/EventModal';
import AddEventModal from './components/AddEventModal/AddEventModal';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  // Carregar eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };
    fetchEvents();
  }, []);

  // Abrir modal ao clicar em um evento
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
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
      const response = await updateEvent(selectedEvent.id, updatedEvent);
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? response.data : event
      );
      setEvents(updatedEvents);
      closeModal();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  return (
    <div className="app">
      <button
        className="add-event-button"
        onClick={() => {
          setSelectedEvent(null); // Limpa o evento selecionado
          setAddModalIsOpen(true); // Abre o modal de adição
        }}
      >
        Adicionar Evento
      </button>
      <CalendarComponent
        events={events}
        onSelectEvent={handleSelectEvent}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
      />
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        onEdit={() => {
          setAddModalIsOpen(true); // Abre o modal de edição
        }}
      />
      <AddEventModal
        isOpen={addModalIsOpen}
        onRequestClose={() => {
          setAddModalIsOpen(false); // Fecha o modal
          setSelectedEvent(null); // Limpa o evento selecionado
        }}
        onSave={selectedEvent ? handleEditEvent : handleAddEvent} // Usa handleEditEvent se estiver editando
        event={selectedEvent} // Passa o evento selecionado para edição
      />
    </div>
  );
};

export default App;