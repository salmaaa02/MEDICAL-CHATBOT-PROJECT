import React from "react";
import PropTypes from "prop-types";

function Questions({
    questionsComplementaires = [],
    reponsesQuestions = {},
    handleReponseChange = () => { },
    envoyerDiagnostic = () => { },
}) {
    return (
        <div className="container">
            <h2>Questions complémentaires</h2>

            {questionsComplementaires.length === 0 ? (
                <p>Aucune question complémentaire.</p>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        envoyerDiagnostic();
                    }}
                >
                    {questionsComplementaires.map((question, i) => (
                        <div key={`${question}-${i}`} className="question-item" style={{ marginBottom: "1.5rem" }}>
                            <fieldset style={{ border: "none", padding: 0 }}>
                                <legend style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{question}</legend>

                                <label style={{ marginRight: "1.5rem", cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name={question}
                                        value="oui"
                                        checked={reponsesQuestions[question] === "oui"}
                                        onChange={() => handleReponseChange(question, "oui")}
                                        required
                                        style={{ marginRight: "0.3rem" }}
                                    />
                                    Oui
                                </label>

                                <label style={{ cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name={question}
                                        value="non"
                                        checked={reponsesQuestions[question] === "non"}
                                        onChange={() => handleReponseChange(question, "non")}
                                        style={{ marginRight: "0.3rem" }}
                                    />
                                    Non
                                </label>
                            </fieldset>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ display: "block", margin: "2rem auto 0 auto", padding: "12px 25px", fontSize: "1.1rem" }}
                    >
                        Obtenir le diagnostic
                    </button>
                </form>
            )}
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
