import React, { useState } from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.navLogo}>
        <img src="/assets/images/orzel_peckowo.png" alt="Logo" />
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.hamburgerBar}></div>
        <div className={styles.hamburgerBar}></div>
        <div className={styles.hamburgerBar}></div>
      </div>

      <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link to="/" className={styles.link} onClick={closeMenu}>
          Strona Główna
        </Link>
        <Link to="/mecze" className={styles.link} onClick={closeMenu}>
          Mecze
        </Link>
        <Link to="/druzyny" className={styles.link} onClick={closeMenu}>
          Drużyny
        </Link>
        <Link to="/tabela" className={styles.link} onClick={closeMenu}>
          Tabela
        </Link>
        <Link to="/zawodnicy" className={styles.link} onClick={closeMenu}>
          Zawodnicy
        </Link>
        <Link to="/o-klubie" className={styles.link} onClick={closeMenu}>
          O Klubie
        </Link>
        <Link to="/kontakt" className={styles.link} onClick={closeMenu}>
          Kontakt
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
