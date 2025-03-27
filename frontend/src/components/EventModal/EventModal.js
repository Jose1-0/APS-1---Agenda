import React from 'react';
import Modal from 'react-modal';
import './EventModal.css';

const EventModal = ({ isOpen, onRequestClose, event, onDelete, onEdit }) => {
  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalhes do Evento"
      className="event-modal"
      overlayClassName="event-modal-overlay"
    >
      <h2>{event.title}</h2>
      <p><strong>Descrição:</strong> {event.description}</p>
      <p><strong>Início:</strong> {event.start.toLocaleString()}</p>
      <p><strong>Término:</strong> {event.end.toLocaleString()}</p>
      <p><strong>Prioridade:</strong> {event.priority}</p>
      <div className="modal-buttons">
        <button onClick={onEdit} className="edit-button">Editar</button>
        <button onClick={onDelete} className="delete-button">Excluir</button>
        <button onClick={onRequestClose} className="close-button">Fechar</button>
      </div>
    </Modal>
  );
};

export default EventModal;