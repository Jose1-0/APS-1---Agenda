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

// // Novo componente para envolver cada célula de dia
// const CustomDayWrapper = ({ children, value }, { onSelectDate }) => {
//   return (
//     <div className="custom-day">
//       {children}
//       <button
//         className="add-button"
//         onClick={(e) => {
//           e.stopPropagation();
//           onSelectDate(value); // Chama a função com a data do dia clicado
//         }}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// Corrigindo contexto para passar props corretamente
// const CustomDayWrapperWithProps = (props) => {
//   const { children, value } = props;
//   const onSelectDate = props.onSelectDate || (() => {});
  
//   // Clona o filho e adiciona uma classe extra
//   const childWithClass = React.cloneElement(children, {
//     className: `${children.props.className || ''} custom-day-content`,
//   });
  
//   return (
//     <div className="custom-day">
//       {childWithClass}
//       <button
//         className="add-button"
//         onClick={(e) => {
//           e.stopPropagation();
//           onSelectDate(value);
//         }}
//       >
//         +
//       </button>
//     </div>
//   );
// };

const CalendarComponent = ({ events, onSelectEvent, view, onView, date, onNavigate, onSelectDate}) => {
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
        // onSelectDate={handleSelectDate}
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