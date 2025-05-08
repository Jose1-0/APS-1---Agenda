import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/pt-br'; // garante que fique em português
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
      <p><strong>Descrição:</strong> {event.description || "Vazio"}</p>
      <p><strong>Início:</strong> {moment(event.start).format('DD/MM/YYYY [às] HH:mm')}</p>
      <p><strong>Término:</strong> {moment(event.end).format('DD/MM/YYYY [às] HH:mm')}</p>
      <p><strong>Prioridade:</strong> {
        event.priority === 1 ? 'Baixa' :
        event.priority === 2 ? 'Média' :
        event.priority === 3 ? 'Alta' :
        'Não definida'
      }</p>
      <div className="modal-buttons">
        <button onClick={onEdit} className="edit-button">Editar</button>
        <button onClick={onDelete} className="delete-button">Excluir</button>
        <button onClick={onRequestClose} className="close-button">Fechar</button>
      </div>
    </Modal>
  );
};

export default EventModal;