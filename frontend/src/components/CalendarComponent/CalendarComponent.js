import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';
// import CustomAgendaEvent from '../CustomAgendaEvent/CustomAgendaEvent';

moment.locale('pt-br');
const localizer = momentLocalizer(moment); // Localização para datas

// Exibição customizada de eventos na agenda
const CustomAgendaEvent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {event.desc && ':  ' + event.desc}
  </span>
);

// Função para estilizar eventos com base na prioridade
const eventStyleGetter = (event) => {
  let backgroundColor;

  switch (event.priority) {
    case 1:
      backgroundColor = '#4caf50'; // verde
      break;
    case 2:
      backgroundColor = '#ffeb3b'; // amarelo
      break;
    case 3:
      backgroundColor = '#f44336'; // vermelho
      break;
    default:
      backgroundColor = '#3174ad'; // cor padrão (azul)
  }

  return {
    style: {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.9,
      color: 'black',
      border: 'none',
      display: 'block',
      paddingLeft: '4px',
    },
  };
};

const CalendarComponent = ({events, onSelectEvent, view, onView, date, onNavigate, onSelectDate}) => {
  return (
    <div style={{ height: '500px', padding: '20px' }}>
      <h1>Agenda de Eventos</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        view={view}
        onView={onView}
        date={date}
        onNavigate={onNavigate}
        eventPropGetter={eventStyleGetter}
        components={{
          agenda: {
            event: CustomAgendaEvent,
          },
          month: {
            dateHeader: ({ label, date }) => (
              <div className="custom-day-wrapper">
                {label}
                <button
                  className="add-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDate(date);
                  }}
                >
                  +
                </button>
              </div>
            ),
          },
        }}
        messages={{
          today: 'Hoje',
          previous: 'Anterior',
          next: 'Próximo',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          agenda: 'Agenda',
          showMore: (total) => `+${total} mais`,
          noEventsInRange: 'Não há eventos neste período.',
        }}
      />
    </div>
  );
};

export default CalendarComponent;