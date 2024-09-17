import React, { useEffect, useState } from 'react';
import styles from './Players.module.scss';

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Wczytanie danych zawodników z pliku JSON
    fetch('/data/players.json')
      .then((response) => response.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className={styles.playersContainer}>
      <h2 className={styles.title}>Zawodnicy</h2>
      <div className={styles.playersList}>
        {players.map((player) => (
          <div key={player.id} className={styles.playerCard}>
            <img
              src={player.image}
              alt={player.name}
              className={styles.playerImage}
            />
            <div className={styles.playerInfo}>
              <h3 className={styles.playerName}>{player.name}</h3>
              <p className={styles.playerPosition}>{player.position}</p>
              <p className={styles.playerNumber}>Numer: <span>{player.number}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
