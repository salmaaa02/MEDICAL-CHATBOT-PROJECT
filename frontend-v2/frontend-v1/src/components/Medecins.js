import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Medecins({ medecins }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 120);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className={`container ${animate ? "fade-in" : ""}`
            }>
                <h2 className="titre" >
                    Médecins Recommandés
                </h2>

                {
                    medecins.length === 0 ? (
                        <p className="aucun-medecin" > Aucun médecin trouvé.</p>
                    ) : (
                        <ul className="liste-medecins" >
                            {
                                medecins.map((doc, i) => (
                                    <li key={i} className="medecin-card" >
                                        <h3>{doc.nom} </h3>
                                        < p className="specialite" > {doc.specialite} </p>
                                        < p > <strong>Adresse : </strong> {doc.adresse}</p >
                                        <p><strong>Ville : </strong> {doc.ville}</p >
                                        <p className="tel" >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="none"
                                                stroke="#0073e6"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                viewBox="0 0 24 24"
                                                aria - hidden="true"
                                            style = {{ marginRight: 6 }}
        >
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.4 2.39.79 3.5a2 2 0 01-.45 2.11L9.09 10a16 16 0 006 6l1.67-1.67a2 2 0 012.11-.45c1.11.39 2.29.66 3.5.79a2 2 0 012 2z" />
                                        </svg>
                                        {doc.telephone}
                                    </p>
        </li>
                    ))
}
            </ul>
                )}
        </div >

            < style > {`
        .container {
          max-width: 720px;
          margin: 3rem auto;
          padding: 2.2rem 2.8rem;
          background-color: #ffffff;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
          transition: opacity 0.5s ease, transform 0.5s ease;
          opacity: 0;
          transform: translateY(15px);
        }
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .titre {
          text-align: center;
          font-weight: 800;
          font-size: 2.1rem;
          color: #004080;
          margin-bottom: 2.4rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 3px solid #0066cc;
          padding-bottom: 0.6rem;
          user-select: none;
        }
        .aucun-medecin {
          text-align: center;
          font-size: 1.25rem;
          color: #7a7a7a;
          margin-top: 4rem;
          font-style: italic;
        }
        .liste-medecins {
          list-style: none;
          padding-left: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.8rem;
        }
        .medecin-card {
          background-color: #f5f9ff;
          border-radius: 14px;
          box-shadow: 0 3px 12px rgba(0, 64, 128, 0.12);
          padding: 1.8rem 2rem;
          cursor: default;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          user-select: none;
          color: #002855;
        }
        .medecin-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 28px rgba(0, 64, 128, 0.25);
        }
        .medecin-card h3 {
          margin: 0 0 0.6rem 0;
          font-weight: 700;
          font-size: 1.3rem;
        }
        .specialite {
          margin: 0 0 1rem 0;
          font-style: italic;
          font-weight: 600;
          color: #00509e;
        }
        .medecin-card p {
          margin: 0.25rem 0;
          font-size: 1rem;
          color: #003366;
          line-height: 1.3;
          display: flex;
          align-items: center;
        }
        .tel {
          font-weight: 600;
          color: #0073e6;
        }
      `}</style>
    </>
    );
}

Medecins.propTypes = {
    medecins: PropTypes.arrayOf(
        PropTypes.shape({
            nom: PropTypes.string.isRequired,
            specialite: PropTypes.string.isRequired,
            ville: PropTypes.string,
            adresse: PropTypes.string,
            telephone: PropTypes.string,
        })
    ).isRequired,
};

export default Medecins;
