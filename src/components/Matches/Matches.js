import React, { useEffect, useState } from 'react';
import styles from './Matches.module.scss';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('ALL'); // Wybrana drużyna
  const [selectedKolejka, setSelectedKolejka] = useState('ALL'); // Wybrana kolejka
  const [expandedMatchId, setExpandedMatchId] = useState(null); // Zapisuje ID klikniętego meczu

  useEffect(() => {
    fetch('/data/matches.json')
      .then((response) => response.json())
      .then((data) => setMatches(data));
  }, []);

  const teams = Array.from(new Set(matches.flatMap(match => [match.team1, match.team2]))); // Unikalne drużyny
  const kolejki = Array.from(new Set(matches.map(match => match.kolejka))); // Unikalne kolejki

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

  const handleKolejkaChange = (e) => {
    setSelectedKolejka(e.target.value);
  };

  const handleMatchClick = (index) => {
    setExpandedMatchId(expandedMatchId === index ? null : index); // Rozwijanie/zamykanie meczu
  };

  const filteredMatches = matches.filter(match => {
    const teamFilter = selectedTeam === 'ALL' || match.team1 === selectedTeam || match.team2 === selectedTeam;
    const kolejkaFilter = selectedKolejka === 'ALL' || match.kolejka === parseInt(selectedKolejka, 10);
    return teamFilter && kolejkaFilter;
  });

  const groupByKolejka = () => {
    return filteredMatches.reduce((acc, match) => {
      const { kolejka } = match;
      if (!acc[kolejka]) {
        acc[kolejka] = [];
      }
      acc[kolejka].push(match);
      return acc;
    }, {});
  };

  const groupedMatches = groupByKolejka();

  return (
    <div className={styles.matchesContainer}>
      <h2 className={styles.title}>Mecze</h2>
      <p className={styles.protonClass}>Klasa B Proton 2024/2025, grupa: wielkopolska II</p>

      {/* Filtrowanie drużyn */}
      <div className={styles.filterContainer}>
        <label htmlFor="teamFilter"></label>
        <select id="teamFilter" onChange={handleTeamChange}>
          <option value="ALL">Wyświetl wszystkie drużyny</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>

        {/* Filtrowanie kolejek */}
        <label htmlFor="kolejkaFilter"></label>
        <select id="kolejkaFilter" onChange={handleKolejkaChange}>
          <option value="ALL">Wyświetl wszystkie kolejki</option>
          {kolejki.map((kolejka, index) => (
            <option key={index} value={kolejka}>Kolejka {kolejka}</option>
          ))}
        </select>
      </div>

      {/* Lista meczów */}
      {Object.keys(groupedMatches).map((kolejka) => (
        <div key={kolejka} className={styles.kolejkaContainer}>
          <h3 className={styles.kolejkaTitle}>Kolejka {kolejka}</h3>
          <div className={styles.matchesList}>
            {groupedMatches[kolejka].map((match, index) => (
              <div 
                key={index} 
                className={`${styles.matchItem} ${expandedMatchId === index ? styles.expanded : ''}`} 
                onClick={() => handleMatchClick(index)} // Kliknięcie rozwija/zamyka mecz
              >
                <div className={styles.mainInfo}>
                  <div className={styles.team}>
                    <img src={match.team1Logo} alt={match.team1} className={styles.teamLogo} />
                    <p>{match.team1}</p>
                  </div>
                  <div className={styles.matchInfo}>
                    <p>{match.date} {match.time}</p>
                    <p className={styles.result}>{match.result ? match.result : "Nie rozegrano"}</p>
                  </div>
                  <div className={styles.team}>
                    <img src={match.team2Logo} alt={match.team2} className={styles.teamLogo} />
                    <p>{match.team2}</p>
                  </div>
                </div>

                {/* Szczegóły meczu, które rozwijają się wewnątrz karty */}
                <div className={styles.matchDetails}>
                  <h4>Szczegóły meczu</h4>
                  <p><strong>{match.team1}</strong> vs <strong>{match.team2}</strong></p>
                  <p>Data: {match.date} - Godzina: {match.time}</p>
                  <p>Wynik: {match.result ? match.result : "Nie rozegrano"}</p>

                  <h5>Gole drużyny {match.team1}:</h5>
                  <ul>
                    {match.team1Goals && match.team1Goals.length > 0 ? (
                      match.team1Goals.map((goal, goalIndex) => (
                        <li key={goalIndex}>{goal}</li>
                      ))
                    ) : match.result && match.result.split('-')[0].trim() === '0' ? (
                      <li>Brak zdobytego gola</li>
                    ) : (
                      <li>Brak podanego strzelca</li>
                    )}
                  </ul>

                  <h5>Gole drużyny {match.team2}:</h5>
                  <ul>
                    {match.team2Goals && match.team2Goals.length > 0 ? (
                      match.team2Goals.map((goal, goalIndex) => (
                        <li key={goalIndex}>{goal}</li>
                      ))
                    ) : match.result && match.result.split('-')[1].trim() === '0' ? (
                      <li>Brak zdobytego gola</li>
                    ) : (
                      <li>Brak podanego strzelca</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matches;
