import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent, createEvent, updateEvent } from './services/api';
import CalendarComponent from './components/CalendarComponent/CalendarComponent';
import EventModal from './components/EventModal/EventModal';
import AddEventModal from './components/AddEventModal/AddEventModal';
import './App.css';

// Nenhum import adicional necessário para notificações locais

const App = () => {
  const [events, setEvents] = useState([]); // Guarda todos os eventos do calendário
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento clicado
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal de visualização
  const [addModalIsOpen, setAddModalIsOpen] = useState(false); // Modal de adicionar/editar
  const [view, setView] = useState('month'); // Visualização atual (mês, semana, etc.)
  const [date, setDate] = useState(new Date()); // Data atual exibida
  const [priorityFilter, setPriorityFilter] = useState(null);

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

    if ('Notification' in window) {
      Notification.requestPermission();
    }

    const limparNotificacoesAntigas = () => {
      const agora = new Date();
      if (agora.getHours() === 0 && agora.getMinutes() === 0) {
        localStorage.removeItem('eventosNotificados');
      }
    };
    const limpezaIntervalo = setInterval(limparNotificacoesAntigas, 60000);
    return () => {
      clearInterval(limpezaIntervalo);
    };
  }, []);

  useEffect(() => {
    const verificarEventosProximos = () => {
      if (Notification.permission !== 'granted') return;

      if (!events || events.length === 0) {
        return;
      }

      const agora = new Date(); // Horário local
      const proximosMinutos = 10;

      const notificados = JSON.parse(localStorage.getItem('eventosNotificados') || '[]');
      const novosNotificados = [...notificados];

      events.forEach(evento => {
        const inicioEvento = new Date(evento.start); // Converte UTC para local
        const tempoRestante = (inicioEvento - agora) / 60000; // Diferença em minutos

        if (
          tempoRestante >= -1 && // permite atraso de até 1 minuto
          tempoRestante <= proximosMinutos &&
          !notificados.includes(evento.id)
        ) {
          try {
            new Notification("Lembrete de Evento", {
              body: `${evento.title} começa em ${Math.round(tempoRestante)} minutos.`,
            });
          } catch (error) {
            console.error("Erro ao disparar notificação:", error);
          }
          novosNotificados.push(evento.id);
        }
      });

      localStorage.setItem('eventosNotificados', JSON.stringify(novosNotificados));
    };

    const intervalo = setInterval(verificarEventosProximos, 30000);

    return () => {
      clearInterval(intervalo);
    };
  }, [events]); // Adiciona `events` como dependência

  useEffect(() => {
    if ('Notification' in window) {
      console.log("Permissão de notificações:", Notification.permission);
      if (Notification.permission === 'granted') {
        new Notification("Teste de Notificação", { body: "Isso é um teste." });
      } else {
        console.log("Permissão de notificações não concedida.");
      }
    } else {
      console.log("Notificações não são suportadas neste navegador.");
    }
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
      const eventNovo = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };
      setEvents([...events, eventNovo]);
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };

  // Editar evento
  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await updateEvent(updatedEvent.id, updatedEvent); // usa o id do próprio evento
      const eventAtualizado = {
        ...response.data,
        start: new Date(response.data.start),
        end: new Date(response.data.end),
      };
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? eventAtualizado : event
      );
      setEvents(updatedEvents);
      closeModal();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  const handleSelectDate = () => {
    const now = new Date(); // Horário atual
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // Horário atual + 1 hora

    const newEvent = {
      title: '',
      start: now.toISOString(), // Converte para ISO
      end: oneHourLater.toISOString(), // Converte para ISO
    };

    console.log("Criando novo evento:", newEvent);
    setSelectedEvent(newEvent);
    setAddModalIsOpen(true);
  };

  return (
    <div className="app">
      <CalendarComponent
                events={
                  priorityFilter
                    ? events.filter(event => event.priority === priorityFilter)
                    : events
                }
        onSelectEvent={handleSelectEvent}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        onSelectDate={handleSelectDate}
        setPriorityFilter={setPriorityFilter}
        priorityFilter={priorityFilter}
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