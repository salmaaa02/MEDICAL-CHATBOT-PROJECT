import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Questions({
    questionsComplementaires = [],
    reponsesQuestions = {},
    handleReponseChange = () => { },
    envoyerDiagnostic = () => { },
}) {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="questions-page"
            style={{
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
                backgroundColor: "#e0f2f1",
                minHeight: "100vh",
            }}
        >
            <main
                className={`questions-main ${animate ? "animate-form" : ""}`}
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    padding: "2rem 2.5rem",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    color: "#004d40",
                    transform: animate ? "translateY(0)" : "translateY(20px)",
                    opacity: animate ? 1 : 0,
                    transition: "all 0.5s ease-out",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxHeight: "85vh", // Limite hauteur globale
                }}
            >
                {/* Logo chatbot au-dessus du titre */}
                <div
                    style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: "#00796b",
                        borderRadius: "50%",
                        marginBottom: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0 2px 8px rgba(0, 121, 107, 0.5)",
                        flexShrink: 0,
                    }}
                    aria-label="Logo chatbot Questions"
                    title="Chatbot Questions"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        stroke="#e0f2f1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        role="img"
                        aria-hidden="true"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"></path>
                        <circle cx="8" cy="11" r="1"></circle>
                        <circle cx="16" cy="11" r="1"></circle>
                    </svg>
                </div>

                <h2
                    style={{
                        fontSize: "2rem",
                        marginBottom: "1.5rem",
                        fontWeight: "700",
                        textAlign: "center",
                        flexShrink: 0,
                    }}
                >
                    Questions complémentaires
                </h2>

                {questionsComplementaires.length === 0 ? (
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontStyle: "italic",
                            textAlign: "center",
                            color: "#00796b",
                            marginTop: "2rem",
                            flexShrink: 0,
                        }}
                    >
                        Aucune question complémentaire.
                    </p>
                ) : (
                    // Conteneur scrollable pour les questions si trop longues
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            envoyerDiagnostic();
                        }}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.8rem",
                            width: "100%",
                            overflowY: "auto",
                            maxHeight: "calc(85vh - 160px)", // hauteur disponible après titre+logo+bouton
                            paddingRight: "8px", // espace scrollbar
                        }}
                    >
                        {questionsComplementaires.map((question, i) => (
                            <fieldset
                                key={`${question}-${i}`}
                                style={{
                                    border: "2px solid #00796b",
                                    borderRadius: "10px",
                                    padding: "1.3rem 1.8rem",
                                    boxShadow: "inset 0 0 6px #004d40",
                                }}
                            >
                                <legend
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "1.2rem",
                                        padding: "0 8px",
                                        color: "#004d40",
                                    }}
                                >
                                    {question}
                                </legend>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "2rem",
                                        marginTop: "1rem",
                                        fontSize: "1.1rem",
                                        color: "#004d40",
                                    }}
                                >
                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            cursor: "pointer",
                                            userSelect: "none",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={question}
                                            value="oui"
                                            checked={reponsesQuestions[question] === "oui"}
                                            onChange={() => handleReponseChange(question, "oui")}
                                            required
                                            style={{ cursor: "pointer" }}
                                        />
                                        Oui
                                    </label>

                                    <label
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            cursor: "pointer",
                                            userSelect: "none",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={question}
                                            value="non"
                                            checked={reponsesQuestions[question] === "non"}
                                            onChange={() => handleReponseChange(question, "non")}
                                            style={{ cursor: "pointer" }}
                                        />
                                        Non
                                    </label>
                                </div>
                            </fieldset>
                        ))}

                        <button
                            type="submit"
                            className="btn-primary submit-btn"
                            style={{
                                marginTop: "1rem",
                                padding: "14px",
                                fontSize: "1.25rem",
                                fontWeight: "700",
                                borderRadius: "50px",
                                backgroundColor: "#00796b",
                                color: "white",
                                border: "none",
                                boxShadow: "0 6px 15px #004d40aa",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#004d40")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#00796b")
                            }
                        >
                            Obtenir le diagnostic
                        </button>
                    </form>
                )}
            </main>
        </div>
    );
}

Questions.propTypes = {
    questionsComplementaires: PropTypes.array,
    reponsesQuestions: PropTypes.object,
    handleReponseChange: PropTypes.func,
    envoyerDiagnostic: PropTypes.func,
};

export default Questions;
