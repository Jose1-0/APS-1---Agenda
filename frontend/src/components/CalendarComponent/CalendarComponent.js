import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarComponent.css';
import CustomAgendaEvent from '../CustomAgendaEvent/CustomAgendaEvent';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onSelectEvent, view, onView, date, onNavigate }) => {
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
        components={{
          agenda: {
            event: CustomAgendaEvent,
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