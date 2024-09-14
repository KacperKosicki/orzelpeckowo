import React, { useEffect, useState, useRef } from 'react';
import styles from './Teams.module.scss';

const Teams = () => {
  const [clubs, setClubs] = useState([]);
  const teamsListRef = useRef(null); // Używamy ref do listy drużyn

  // Ładowanie danych z pliku JSON
  useEffect(() => {
    fetch('/data/clubs.json')
      .then((response) => response.json())
      .then((data) => setClubs(data));
  }, []);

  // Dodanie klasy widocznej po załadowaniu strony
  useEffect(() => {
    if (teamsListRef.current) {
      setTimeout(() => {
        teamsListRef.current.classList.add(styles.visible); // Dodanie klasy 'visible' po załadowaniu
      }, 100); // Delikatne opóźnienie
    }
  }, []);

  return (
    <div className={styles.teamsContainer}>
      <h2 className={styles.title}>Drużyny</h2>
      <p className={styles.protonClass}>Klasa B Proton 2024/2025, grupa: wielkopolska II</p>
      <div className={styles.teamsList} ref={teamsListRef}>
        {clubs.map((club, index) => (
          <div key={index} className={styles.teamItem}>
            <img src={club.logo} alt={`${club.name} logo`} className={styles.teamLogo} />
            <p className={styles.teamName}>{club.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
