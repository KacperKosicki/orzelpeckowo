import React, { useState } from 'react';
import styles from './Contact.module.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Obsługa przesyłania formularza
    alert(`Wiadomość wysłana! Dziękujemy, ${formData.name}.`);
  };

  return (
    <div className={styles.contactContainer}>
      <h2 className={styles.title}>Kontakt</h2>
      <p className={styles.subtitle}>Jesteśmy dostępni, aby odpowiedzieć na wszystkie Twoje pytania!</p>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>Imię:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="email" className={styles.label}>E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="message" className={styles.label}>Wiadomość:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
          required
        ></textarea>

        <button type="submit" className={styles.submitButton}>Wyślij wiadomość</button>
      </form>
    </div>
  );
};

export default Contact;
