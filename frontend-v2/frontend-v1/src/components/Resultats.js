import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Resultat({ diagnostic, medecins = [], onNouveauDiagnostic = () => { } }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                backgroundColor: "#f5f7fa",
                minHeight: "100vh",
                padding: "3rem 1rem",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <section
                className={`resultat-container ${animate ? "fade-in-up" : ""}`}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 16,
                    maxWidth: 720,
                    width: "100%",
                    padding: "2.5rem 3rem",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.07)",
                    color: "#2c3e50",
                    overflowY: "auto",
                    maxHeight: "85vh",
                }}
            >
                {/* Logo + titre */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "2rem",
                        gap: "1rem",
                    }}
                >
                    <div
                        aria-label="Icône diagnostic"
                        title="Diagnostic"
                        style={{
                            width: 48,
                            height: 48,
                            backgroundColor: "#2980b9",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 0 10px rgba(41, 128, 185, 0.5)",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="none"
                            stroke="#ecf0f1"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12l3 3 5-5" />
                        </svg>
                    </div>
                    <h2
                        style={{
                            fontSize: "2.2rem",
                            fontWeight: "700",
                            letterSpacing: "0.02em",
                            color: "#34495e",
                        }}
                    >
                        Résultat du diagnostic
                    </h2>
                </div>

                {diagnostic ? (
                    <>
                        <p
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: "600",
                                marginBottom: "2rem",
                                textAlign: "center",
                                color: "#34495e",
                            }}
                        >
                            Maladie probable :{" "}
                            <span style={{ color: "#2980b9", fontWeight: "700" }}>
                                {diagnostic}
                            </span>
                        </p>

                        <h3
                            style={{
                                fontSize: "1.7rem",
                                fontWeight: "700",
                                color: "#2980b9",
                                marginBottom: "1.3rem",
                                borderBottom: "2px solid #d6eaf8",
                                paddingBottom: "0.3rem",
                            }}
                        >
                            Médecins recommandés
                        </h3>

                        {medecins.length === 0 ? (
                            <p
                                style={{
                                    fontStyle: "italic",
                                    textAlign: "center",
                                    color: "#7f8c8d",
                                    fontSize: "1.1rem",
                                    marginTop: "1.5rem",
                                }}
                            >
                                Aucun médecin trouvé pour cette maladie.
                            </p>
                        ) : (
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                {medecins.map((doc, i) => (
                                    <li
                                        key={`${doc.nom}-${i}`}
                                        style={{
                                            backgroundColor: "#ecf0f1",
                                            marginBottom: "1.4rem",
                                            padding: "1.4rem 2.2rem",
                                            borderRadius: 14,
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                            transition: "transform 0.2s ease",
                                            cursor: "default",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.03)";
                                            e.currentTarget.style.boxShadow =
                                                "0 8px 16px rgba(0,0,0,0.12)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                                        }}
                                    >
                                        <h4
                                            style={{
                                                margin: 0,
                                                marginBottom: "0.35rem",
                                                fontWeight: "700",
                                                fontSize: "1.22rem",
                                                color: "#2c3e50",
                                            }}
                                        >
                                            {doc.nom}
                                        </h4>

                                        <p
                                            style={{
                                                margin: "0 0 0.7rem 0",
                                                fontStyle: "italic",
                                                color: "#2980b9",
                                            }}
                                        >
                                            {doc.specialite}
                                        </p>

                                        <p
                                            style={{
                                                margin: "0.25rem 0",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.55rem",
                                                fontSize: "1rem",
                                                color: "#34495e",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17"
                                                height="17"
                                                fill="none"
                                                stroke="#34495e"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            Ville: {doc.ville}
                                        </p>

                                        <p
                                            style={{
                                                margin: "0.25rem 0",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.55rem",
                                                fontSize: "1rem",
                                                color: "#34495e",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17"
                                                height="17"
                                                fill="none"
                                                stroke="#34495e"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M3 10h18v10H3z" />
                                                <path d="M3 10l9 6 9-6" />
                                            </svg>
                                            Adresse: {doc.adresse}
                                        </p>

                                        <p
                                            style={{
                                                margin: "0.25rem 0",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.55rem",
                                                fontSize: "1rem",
                                                color: "#34495e",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="17"
                                                height="17"
                                                fill="none"
                                                stroke="#34495e"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.4 2.39.79 3.5a2 2 0 01-.45 2.11L9.09 10a16 16 0 006 6l1.67-1.67a2 2 0 012.11-.45c1.11.39 2.29.66 3.5.79a2 2 0 012 2z" />
                                            </svg>
                                            Téléphone: {doc.telephone}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            onClick={onNouveauDiagnostic}
                            style={{
                                marginTop: "3rem",
                                backgroundColor: "#2980b9",
                                borderRadius: "30px",
                                border: "none",
                                padding: "14px 38px",
                                fontWeight: "700",
                                fontSize: "1.2rem",
                                color: "#fff",
                                boxShadow: "0 6px 16px rgba(41, 128, 185, 0.5)",
                                cursor: "pointer",
                                transition: "background-color 0.25s ease",
                                userSelect: "none",
                                letterSpacing: "0.02em",
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "fit-content",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f6391")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                            aria-label="Recommencer un nouveau diagnostic"
                        >
                            Nouveau diagnostic
                        </button>
                    </>
                ) : (
                    <p
                        style={{
                            fontStyle: "italic",
                            color: "#7f8c8d",
                            marginTop: "3rem",
                            textAlign: "center",
                            fontSize: "1.2rem",
                        }}
                    >
                        Pas de diagnostic disponible.
                    </p>
                )}

                <style>{`
          .fade-in-up {
            animation: fadeInUp 0.7s ease forwards;
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(25px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Scrollbar styling */
          .resultat-container::-webkit-scrollbar {
            width: 7px;
          }
          .resultat-container::-webkit-scrollbar-thumb {
            background: #2980b9;
            border-radius: 8px;
          }
          .resultat-container::-webkit-scrollbar-track {
            background: #d6eaf8;
          }
        `}</style>
            </section>
        </div>
    );
}

Resultat.propTypes = {
    diagnostic: PropTypes.string,
    medecins: PropTypes.arrayOf(
        PropTypes.shape({
            nom: PropTypes.string.isRequired,
            specialite: PropTypes.string.isRequired,
            ville: PropTypes.string,
            adresse: PropTypes.string,
            telephone: PropTypes.string,
        })
    ),
    onNouveauDiagnostic: PropTypes.func,
};

export default Resultat;
