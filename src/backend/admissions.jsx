// src/components/Admissions.jsx
import React, { useState } from 'react';
import '../styles/admissions.css';

const Admissions = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent('Admission Enquiry 2025-26');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:ramgoud696@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="page admissions-page">
      <h1>Admissions 2025-26</h1>
      <p>
        For admission enquiries, share your details below. Your default email
        app will open with a pre-filled message to the admissions office.
      </p>

      <form className="admissions-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder="Share your branch preference, exam rank, or any questions."
          />
        </div>

        <button type="submit" className="admissions-submit-btn">
          Send Admission Email
        </button>
      </form>
    </section>
  );
};

export default Admissions;
