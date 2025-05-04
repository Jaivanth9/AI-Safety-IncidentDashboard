import React, { useState } from 'react';
import './App.css';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

const initialIncidents: Incident[] = [
  { id: 1, title: "Biased Recommendation Algorithm", description: "Algorithm consistently favored certain demographics...", severity: "Medium", reported_at: "2025-03-15T10:00:00Z" },
  { id: 2, title: "LLM Hallucination in Critical Info", description: "LLM provided incorrect safety procedure information...", severity: "High", reported_at: "2025-04-01T14:30:00Z" },
  { id: 3, title: "Minor Data Leak via Chatbot", description: "Chatbot inadvertently exposed non-sensitive user metadata...", severity: "Low", reported_at: "2025-03-20T09:15:00Z" }
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');

  const handleAddIncident = () => {
    if (!title.trim() || !description.trim()) return;
    const newIncident: Incident = {
      id: incidents.length + 1,
      title,
      description,
      severity,
      reported_at: new Date().toISOString()
    };
    setIncidents([newIncident, ...incidents]);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  const filteredIncidents = incidents.filter(incident =>
    filter === 'All' ? true : incident.severity === filter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    return sortOrder === 'Newest'
      ? new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
      : new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
  });

  return (
    <div className="App">
      <h1>AI Safety Incident Dashboard</h1>
      <div className="controls">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
      <ul className="incident-list">
        {sortedIncidents.map(incident => (
          <li key={incident.id}>
            <h3>{incident.title}</h3>
            <p><b>Severity:</b> {incident.severity}</p>
            <p><b>Date:</b> {new Date(incident.reported_at).toLocaleString()}</p>
            <button onClick={() => setExpanded(expanded === incident.id ? null : incident.id)}>
              {expanded === incident.id ? 'Hide Details' : 'View Details'}
            </button>
            {expanded === incident.id && <p>{incident.description}</p>}
          </li>
        ))}
      </ul>
      <div className="form">
        <h2>Report New Incident</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleAddIncident}>Submit</button>
      </div>
    </div>
  );
}

export default App;
