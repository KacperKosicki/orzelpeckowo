import React, { useEffect, useState, useRef } from 'react';
import styles from './Table.module.scss';

const Table = () => {
  const [table, setTable] = useState([]);
  const tableRef = useRef(null); // Używamy ref do tabeli

  // Ładowanie danych z pliku JSON
  useEffect(() => {
    fetch('/data/table.json')
      .then((response) => response.json())
      .then((data) => {
        const sortedTable = data.sort((a, b) => b.points - a.points);
        setTable(sortedTable);
      });
  }, []);

  // Dodanie klasy widocznej po załadowaniu strony
  useEffect(() => {
    if (tableRef.current) {
      setTimeout(() => {
        tableRef.current.classList.add(styles.visible); // Dodanie klasy 'visible' po załadowaniu
      }, 100); // Delikatne opóźnienie
    }
  }, []);

  return (
    <div
      className={styles.tableContainer}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${process.env.PUBLIC_URL}/assets/images/orzel_peckowo_home_4.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <h2 className={styles.title}>TABELA</h2>
      <p className={styles.protonClass}>Klasa B Proton 2024/2025, grupa: wielkopolska II</p>
      <table className={styles.table} ref={tableRef}>
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Nazwa</th>
            <th>M.</th>
            <th>Pkt.</th>
            <th>Z.</th>
            <th>R.</th>
            <th>P.</th>
            <th>Bramki</th>
          </tr>
        </thead>
        <tbody>
          {table.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td className={styles.points}>{team.points}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
