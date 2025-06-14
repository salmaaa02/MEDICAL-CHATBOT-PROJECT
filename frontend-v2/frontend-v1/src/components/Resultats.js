import React from "react";
import PropTypes from "prop-types";

function Resultat({ diagnostic, medecins = [], onNouveauDiagnostic = () => { } }) {
    return (
        <div className="container" style={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem" }}>
            <h2 style={{ color: "#003366", marginBottom: "1.5rem" }}>Résultat du diagnostic</h2>

            {diagnostic ? (
                <>
                    <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                        <strong>Maladie probable :</strong> {diagnostic}
                    </p>

                    <h3 style={{ marginBottom: "1rem", color: "#00509e" }}>Médecins recommandés :</h3>

                    {medecins.length === 0 ? (
                        <p>Aucun médecin trouvé pour cette maladie.</p>
                    ) : (
                        <ul style={{ listStyleType: "none", padding: 0 }}>
                            {medecins.map((doc, i) => (
                                <li
                                    key={`${doc.nom}-${i}`}
                                    style={{
                                        backgroundColor: "#f0f4ff",
                                        padding: "1rem",
                                        borderRadius: "8px",
                                        marginBottom: "1rem",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <strong style={{ fontSize: "1.1rem", color: "#002855" }}>{doc.nom}</strong> —{" "}
                                    <em>{doc.specialite}</em>
                                    <br />
                                    <span>Ville : {doc.ville}</span>
                                    <br />
                                    <span>Adresse : {doc.adresse}</span>
                                    <br />
                                    <span>Téléphone : {doc.telephone}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button
                        className="btn-primary"
                        onClick={onNouveauDiagnostic}
                        style={{
                            marginTop: "2rem",
                            padding: "12px 28px",
                            fontSize: "1.1rem",
                            backgroundColor: "#004080",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Nouveau diagnostic
                    </button>
                </>
            ) : (
                <p style={{ fontStyle: "italic" }}>Pas de diagnostic disponible.</p>
            )}
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
