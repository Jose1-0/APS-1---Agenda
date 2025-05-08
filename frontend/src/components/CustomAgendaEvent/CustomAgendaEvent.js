import React from 'react';
import './CustomAgendaEvent.css';

const CustomAgendaEvent = ({ event }) => {
  return (
    <div className="custom-agenda-event">
      <strong>{event.title}</strong>
      <p>{event.description}</p>
      {/* {event.priority && <small>Prioridade: {event.priority}</small>} */}
    </div>
  );
};

export default CustomAgendaEvent;