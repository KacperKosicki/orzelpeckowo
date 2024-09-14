import React, { useEffect, useState } from 'react';
import './Calendar.module.scss';

const Calendar = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/data/matches.json')
      .then((response) => response.json())
      .then((data) => setMatches(data));
  }, []);

  return (
    <div className="calendar">
      <h2>Kalendarz Meczów</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            <p>{match.date} - {match.team1} vs {match.team2} - {match.result ? `Wynik: ${match.result}` : `Godzina: ${match.time}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
