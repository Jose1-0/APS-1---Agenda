import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const CustomAgendaEvent = ({ event }) => (
  <span>
    <strong>{event.title}</strong>
    {event.desc && ':  ' + event.desc}
  </span>
);

const eventStyleGetter = (event) => {
  let backgroundColor;

  switch (event.priority) {
    case 1:
      backgroundColor = '#4caf50';
      break;
    case 2:
      backgroundColor = '#ffeb3b';
      break;
    case 3:
      backgroundColor = '#f44336';
      break;
    default:
      backgroundColor = '#3174ad';
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

const CustomToolbar = ({ label, onNavigate, onView, view, setPriorityFilter, priorityFilter }) => (
  <div className="rbc-toolbar">
    <div className="rbc-btn-group">
      <button onClick={() => onNavigate('TODAY')}>Hoje</button>
      <button onClick={() => onNavigate('PREV')}>Anterior</button>
      <button onClick={() => onNavigate('NEXT')}>Próximo</button>
    </div>
    {view === 'agenda' && (
      <div className="priority-filter" style={{ marginLeft: '20px' }}>
        <label>Filtrar por prioridade: </label>
        <select
          value={priorityFilter || ''}
          onChange={(e) =>
            setPriorityFilter(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">Todas</option>
          <option value="1">Baixa</option>
          <option value="2">Média</option>
          <option value="3">Alta</option>
        </select>
      </div>
    )}
    <span className="rbc-toolbar-label">{label}</span>
    <div className="rbc-btn-group">
      <button onClick={() => onView('month')} className={view === 'month' ? 'active' : ''}>Mês</button>
      <button onClick={() => onView('week')} className={view === 'week' ? 'active' : ''}>Semana</button>
      <button onClick={() => onView('day')} className={view === 'day' ? 'active' : ''}>Dia</button>
      <button onClick={() => onView('agenda')} className={view === 'agenda' ? 'active' : ''}>Agenda</button>
    </div>
  </div>
);

const CalendarComponent = ({
  events,
  onSelectEvent,
  view,
  onView,
  date,
  onNavigate,
  onSelectDate,
  setPriorityFilter,
  priorityFilter,
}) => {
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
          toolbar: (props) => (
            <CustomToolbar
              {...props}
              onView={onView}
              view={view}
              setPriorityFilter={setPriorityFilter}
              priorityFilter={priorityFilter}
            />
          ),
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
          allDay: 'dia inteiro'
        }}
      />
    </div>
  );
};

export default CalendarComponent;