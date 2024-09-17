import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [nextMatch, setNextMatch] = useState(null);
  const [lastMatch, setLastMatch] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [matchStarted, setMatchStarted] = useState(false);
  const logosRef = useRef(null);

  // Funkcja konwersji daty i czasu
  const convertDateTime = (dateStr, timeStr) => {
    const months = {
      'stycznia': '01',
      'lutego': '02',
      'marca': '03',
      'kwietnia': '04',
      'maja': '05',
      'czerwca': '06',
      'lipca': '07',
      'sierpnia': '08',
      'września': '09',
      'października': '10',
      'listopada': '11',
      'grudnia': '12',
    };

    const [day, monthWord, year] = dateStr.split(' ');
    const month = months[monthWord];
    
    // Jeśli czas nie jest podany, ustaw na domyślny (np. 00:00)
    const time = timeStr || '00:00';

    return `${year}-${month}-${day.padStart(2, '0')}T${time}`;
  };

  // Licznik odliczania
  useEffect(() => {
    const interval = setInterval(() => {
      if (nextMatch) {
        const matchDate = new Date(convertDateTime(nextMatch.date, nextMatch.time));
        const now = new Date();
        const difference = matchDate - now;

        if (!isNaN(difference)) {
          if (difference <= 0) {
            // Mecz się rozpoczął lub już minął
            setTimeLeft({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            setMatchStarted(true); // Ustawia, że mecz się rozpoczął
            clearInterval(interval); // Zatrzymaj licznik
          } else {
            setMatchStarted(false); // Mecz jeszcze się nie rozpoczął
            setTimeLeft({
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            });
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMatch]);

  // Pobieranie danych meczowych i klubowych
  useEffect(() => {
    fetch('/data/matches.json')
      .then((response) => response.json())
      .then((data) => {
        const orzelMatches = data.filter(
          (match) => match.team1 === 'Orzeł Pęckowo' || match.team2 === 'Orzeł Pęckowo'
        );

        setNextMatch(
          orzelMatches.find((match) => {
            const matchDate = new Date(convertDateTime(match.date, match.time));
            return matchDate >= new Date();
          })
        );

        setLastMatch(
          orzelMatches
            .filter((match) => {
              const matchDate = new Date(convertDateTime(match.date, match.time));
              return matchDate < new Date();
            })
            .sort((a, b) => new Date(convertDateTime(b.date, b.time)) - new Date(convertDateTime(a.date, a.time)))[0]
        );
      });

    fetch('/data/clubs.json')
      .then((response) => response.json())
      .then((data) => setClubs(data));
  }, []);

  // Animacja logotypów klubowych
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const logos = logosRef.current.querySelectorAll(`.${styles.clubLogo}`);
    logos.forEach((logo) => observer.observe(logo));

    return () => {
      if (logosRef.current) {
        logos.forEach((logo) => observer.unobserve(logo));
      }
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div
        className={styles.introSection}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${process.env.PUBLIC_URL}/assets/images/orzel_peckowo_home_6.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100vh',
        }}
      >
        <h2 className={styles.title}>
          Witamy na stronie <span className={styles.span}>LZS Orzeł Pęckowo</span>
        </h2>
        <p className={styles.subtitle}>
          Śledź aktualne informacje o klubie, nadchodzących meczach i wydarzeniach.
        </p>
        <Link to="/mecze" className={styles.ctaButton}>
          Zobacz nadchodzące mecze
        </Link>
        <div className={styles.leagueSection}>
          <div className={styles.logosContainer} ref={logosRef}>
            {clubs.map((club, index) => (
              <div key={index} className={styles.clubLogo}>
                <img src={club.logo} alt={club.name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {(nextMatch || lastMatch) && (
        <div className={styles.countdownSection}>
          <div className={styles.matchContainer}>
            {/* Sprawdź, czy mecz się nie rozpoczął. Jeśli nie, pokaż szczegóły następnego meczu */}
            {!matchStarted && nextMatch ? (
              <div className={styles.nextMatch}>
                <h3>Następny mecz</h3>
                <div className={styles.mainInfo}>
                  <div className={styles.team}>
                    <img src={nextMatch.team1Logo} alt={nextMatch.team1} className={styles.teamLogo} />
                    <p>{nextMatch.team1}</p>
                  </div>
                  <div className={styles.matchInfo}>
                    <p>{nextMatch.date} - {nextMatch.time || '00:00'}</p>
                  </div>
                  <div className={styles.team}>
                    <img src={nextMatch.team2Logo} alt={nextMatch.team2} className={styles.teamLogo} />
                    <p>{nextMatch.team2}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.noNextMatch}>
                <h3>Brak następnego meczu do wyświetlenia</h3>
              </div>
            )}

            {lastMatch && (
              <div className={styles.lastMatch}>
                <h3>Ostatni mecz</h3>
                <div className={styles.mainInfo}>
                  <div className={styles.team}>
                    <img src={lastMatch.team1Logo} alt={lastMatch.team1} className={styles.teamLogo} />
                    <p>{lastMatch.team1}</p>
                  </div>
                  <div className={styles.matchInfo}>
                    <p>{lastMatch.date}</p>
                    <p className={styles.result}>{lastMatch.result}</p>
                  </div>
                  <div className={styles.team}>
                    <img src={lastMatch.team2Logo} alt={lastMatch.team2} className={styles.teamLogo} />
                    <p>{lastMatch.team2}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Licznik */}
          <div className={styles.countdown}>
            <div className={styles.timeBox}>
              <span>{timeLeft.days}</span> dni
            </div>
            <div className={styles.timeBox}>
              <span>{timeLeft.hours}</span> godzin
            </div>
            <div className={styles.timeBox}>
              <span>{timeLeft.minutes}</span> minut
            </div>
            <div className={styles.timeBox}>
              <span>{timeLeft.seconds}</span> sekund
            </div>
          </div>
        </div>
      )}

      <div
        className={styles.newsSection}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${process.env.PUBLIC_URL}/assets/images/orzel_peckowo_home_8.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: 'auto',
          minHeight: '100vh',
        }}
      >
        <div className={styles.newsContent}>
          <h2 className={styles.title}>
            Najnowsze aktualności <span className={styles.span}>LZS Orzeł Pęckowo</span>
          </h2>
          <p className={styles.subtitle}>
            Śledź najnowsze aktualności o klubie i zobacz co się w nim dzieje.
          </p>
          <div className={styles.newsList}>
            <div className={styles.newsItem}>
              <h4>Nabór do drużyny 2024/2025</h4>
              <p>Rozpoczął się nabór do naszej drużyny na nowy sezon! Zgłoś się już teraz.</p>
              <Link to="/#" className={styles.ctaButton}>
                Zobacz nabór do drużyny
              </Link>
              <div className={styles.spacer}></div>
            </div>
            <div className={styles.newsItem}>
              <h4>Nowe stroje dla drużyny</h4>
              <p>Prezentujemy nowe stroje, które będą nosić nasi zawodnicy w sezonie 2024/2025.</p>
              <Link to="/#" className={styles.ctaButton}>
                Zobacz nowe stroje
              </Link>
              <div className={styles.spacer}></div>
            </div>
            <div className={styles.newsItem}>
              <h4>Plan sparingów przed sezonem</h4>
              <p>Zobacz harmonogram nadchodzących sparingów przed startem rozgrywek.</p>
              <Link to="/#" className={styles.ctaButton}>
                Zobacz harmonogram treningów
              </Link>
              <div className={styles.spacer}></div>
            </div>
            <div className={styles.newsItem}>
              <h4>Nasza strona na Facebook'u</h4>
              <p>Odwiedź nasz profil na Facebooku i bądź na bieżąco z wszystkimi aktualnościami i wydarzeniami.</p>
              <a
                href="https://www.facebook.com/profile.php?id=100057436158579"
                className={styles.fbLink}
              >
                Zobacz Facebook'a
              </a>
              <div className={styles.spacer}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
