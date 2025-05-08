import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './AddEventModal.css';

const AddEventModal = ({ isOpen, onRequestClose, onSave, event }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [priority, setPriority] = useState(1);

  // Preenche o formulário com os dados do evento, se estiver editando
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStart(moment(event.start).format('YYYY-MM-DDTHH:mm'));
      setEnd(moment(event.end).format('YYYY-MM-DDTHH:mm'));
      setPriority(event.priority ?? 1); // usa 1 se for null ou undefined
    } else {
      // Limpa o formulário se estiver adicionando um novo evento
      setTitle('');
      setDescription('');
      setStart('');
      setEnd('');
      setPriority(1);
    }
  }, [event, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: event?.id,
      title,
      description,
      start: new Date(start),
      end: new Date(end),
      priority: parseInt(priority, 10),
    };
    console.log("Salvando evento com ID:", newEvent.id);
    onSave(newEvent); // Vai pra handleEditEvent ou handleAddEvent
    onRequestClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>{event && event.id ? 'Editar Evento' : 'Criar Evento'}</h2> {/* Título ajustado */}
        <form onSubmit={handleSubmit}>  
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Data e Hora de Início</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Data e Hora de Término</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Prioridade</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value={1}>Baixa</option>
              <option value={2}>Média</option>
              <option value={3}>Alta</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onRequestClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;