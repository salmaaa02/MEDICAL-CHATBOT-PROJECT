import React from "react";
import PropTypes from "prop-types";

function Medecins({ medecins }) {
    return (
        <div
            className="container"
            style={{
                maxWidth: 720,
                margin: "3rem auto",
                padding: "2rem 2.5rem",
                backgroundColor: "#ffffff",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                fontFamily:
                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                color: "#222",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: "2rem",
                    color: "#003366",
                    marginBottom: "2rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    borderBottom: "3px solid #004080",
                    paddingBottom: "0.5rem",
                }}
            >
                Médecins Recommandés
            </h2>

            {medecins.length === 0 ? (
                <p
                    style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                        color: "#666",
                        marginTop: "3rem",
                    }}
                >
                    Aucun médecin trouvé.
                </p>
            ) : (
                <ul
                    style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        margin: 0,
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {medecins.map((doc, i) => (
                        <li
                            key={i}
                            style={{
                                backgroundColor: "#f9fbff",
                                borderRadius: 10,
                                boxShadow:
                                    "0 2px 8px rgba(0, 64, 128, 0.15)",
                                padding: "1.4rem 1.6rem",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 20px rgba(0, 64, 128, 0.25)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow =
                                    "0 2px 8px rgba(0, 64, 128, 0.15)";
                            }}
                        >
                            <h3
                                style={{
                                    margin: "0 0 0.5rem 0",
                                    color: "#004080",
                                    fontWeight: "700",
                                    fontSize: "1.25rem",
                                }}
                            >
                                {doc.nom}
                            </h3>
                            <p
                                style={{
                                    margin: "0 0 0.5rem 0",
                                    fontStyle: "italic",
                                    color: "#00509e",
                                    fontWeight: "600",
                                }}
                            >
                                {doc.specialite}
                            </p>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>
                                <strong>Adresse :</strong> {doc.adresse}
                            </p>
                            <p style={{ margin: "0.25rem 0", color: "#333" }}>
                                <strong>Ville :</strong> {doc.ville}
                            </p>
                            <p
                                style={{
                                    margin: "0.25rem 0",
                                    fontWeight: "600",
                                    color: "#0073e6",
                                }}
                            >
                                📞 {doc.telephone}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Medecins.propTypes = {
    medecins: PropTypes.array.isRequired,
};

export default Medecins;
