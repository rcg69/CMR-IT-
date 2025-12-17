// src/components/RD.jsx
import React from 'react';
import '../styles/RD.css';
import useRDReveal from '../hooks/rdreveal';

const RD = () => {
  const heroReveal = useRDReveal();
  const statsReveal = useRDReveal();
  const activitiesReveal = useRDReveal();
  const policyReveal = useRDReveal();

  return (
    <div className="page rd-page">
      {/* Hero */}
      <section
        ref={heroReveal.ref}
        className={`rd-hero reveal ${heroReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <div className="rd-hero-content">
          <h1>Research &amp; Development Cell</h1>
          <p>
            The Research &amp; Development (R&amp;D) cell at CMRIT Hyderabad integrates all
            departments to facilitate academic research, sponsored projects and consultancy
            services for students, faculty and other stakeholders. [web:95]
          </p>
          <p>
            Through research labs, Centers of Excellence, innovation and incubation centers,
            the cell nurtures a research culture that supports publications, patents and
            technology‑driven solutions. [web:95][web:96]
          </p>
        </div>
      </section>

      {/* Highlights / Stats */}
      <section
        ref={statsReveal.ref}
        className={`rd-section reveal ${statsReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>R&amp;D Focus Areas</h2>
        <div className="rd-grid">
          <article className="rd-card">
            <h3>Publications &amp; Patents</h3>
            <p>
              The cell encourages staff and students to publish in reputed national and
              international journals and conferences, and actively supports filing of patents
              and protection of intellectual property. [web:95][web:96]
            </p>
          </article>

          <article className="rd-card">
            <h3>Sponsored Projects &amp; Consultancy</h3>
            <p>
              Faculty are motivated to prepare and submit proposals to funding agencies and
              undertake sponsored R&amp;D and consultancy projects, strengthening industry–
              institute interaction. [web:96][web:100]
            </p>
          </article>

          <article className="rd-card">
            <h3>Centers of Excellence</h3>
            <p>
              Research centres and CoEs in areas like Artificial Intelligence, Machine Learning
              and Data Science provide advanced infrastructure for UG/PG projects and
              interdisciplinary work. [web:96][web:95]
            </p>
          </article>
        </div>
      </section>

      {/* Activities */}
      <section
        ref={activitiesReveal.ref}
        className={`rd-section reveal ${activitiesReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>R&amp;D Activities</h2>
        <div className="rd-grid">
          <article className="rd-card">
            <h3>Workshops &amp; Conferences</h3>
            <p>
              The R&amp;D cell associates with departments to organize workshops, seminars,
              symposiums and conferences in thrust areas to enhance research skills among
              staff and students. [web:95][web:96]
            </p>
          </article>

          <article className="rd-card">
            <h3>Innovation, IPR &amp; Startups</h3>
            <p>
              Integrated with innovation, incubation and entrepreneurship cells, R&amp;D
              supports prototypes, startup ideas and IPR activities, including mentoring and
              patent filing support. [web:95][web:96][web:103]
            </p>
          </article>

          <article className="rd-card">
            <h3>Social &amp; Outreach Research</h3>
            <p>
              Through initiatives linked with Unnat Bharat Abhiyan and community outreach,
              the cell promotes research and innovation that address rural and societal needs. [web:95][web:96]
            </p>
          </article>
        </div>
      </section>

      {/* Policy & Vision */}
      <section
        ref={policyReveal.ref}
        className={`rd-section reveal ${policyReveal.isVisible ? 'reveal-visible' : ''}`}
      >
        <h2>Vision, Mission &amp; Policy</h2>
        <div className="rd-grid single">
          <article className="rd-card">
            <h3>R&amp;D Vision &amp; Mission</h3>
            <p>
              The vision is to facilitate innovative and multidisciplinary research in
              collaboration with industry to meet global needs by involving all stakeholders. [web:96]
            </p>
            <p>
              Its mission is to develop an ecosystem for R&amp;D through effective contribution
              of staff and students to prepare proposals, obtain funding, publish papers and
              patents, and promote entrepreneurship. [web:96]
            </p>
          </article>

          <article className="rd-card">
            <h3>R&amp;D Policy &amp; Support</h3>
            <p>
              The R&amp;D policy outlines rules and incentives for research, seed funding,
              consultancy, and recognition, ensuring high‑quality, ethical scientific work on
              campus. [web:96][web:100]
            </p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default RD;
