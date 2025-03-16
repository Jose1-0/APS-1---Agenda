import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const App = () => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/')
            .then(response => {
                const formattedEvents = response.data.map(event => ({
                    title: event.title,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }));
                setEvents(formattedEvents);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{ height: '500px', padding: '20px' }}>
            <h1>Agenda de Eventos</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
            />
        </div>
    );
};

export default App;