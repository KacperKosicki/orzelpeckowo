import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img src="/assets/images/orzel_peckowo.png" alt="LZS Orzeł Pęckowo" className={styles.logo} />
          <p>© 2024 <span>LZS Orzeł Pęckowo</span> - Wszystkie prawa zastrzeżone.</p>
        </div>

        <div className={styles.linksSection}>
          <h4>Linki</h4>
          <ul>
            <li><a href="/">Strona główna</a></li>
            <li><a href="/o-klubie">O klubie</a></li>
            <li><a href="/mecze">Mecze</a></li>
            <li><a href="/druzyny">Drużyny</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h4>Kontakt</h4>
          <p>Email: kontakt@orzelpeckowo.pl</p>
          <p>Telefon: +48 123 456 789</p>
          <div className={styles.socialIcons}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>Strona stworzona przez Kacper Kosicki</p>
      </div>
    </footer>
  );
}

export default Footer;
