import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Symptomes({
    symptomesInitiaux,
    setSymptomesInitiaux,
    setMaladiesProbables,
    setQuestions,
}) {
    const [nouveauSymptome, setNouveauSymptome] = useState("");
    const navigate = useNavigate();

    const ajouterSymptome = () => {
        const symp = nouveauSymptome.trim().toLowerCase();
        if (symp && symptomesInitiaux && !symptomesInitiaux.includes(symp)) {
            if (typeof setSymptomesInitiaux === "function") {
                setSymptomesInitiaux([...symptomesInitiaux, symp]);
                setNouveauSymptome("");
            } else {
                console.warn("setSymptomesInitiaux n'est pas défini !");
            }
        }
    };

    const supprimerSymptome = (symptome) => {
        if (typeof setSymptomesInitiaux === "function") {
            setSymptomesInitiaux(symptomesInitiaux.filter((s) => s !== symptome));
        } else {
            console.warn("setSymptomesInitiaux n'est pas défini !");
        }
    };


    const envoyerSymptomes = async () => {
        if (symptomesInitiaux.length < 3) {
            alert("Veuillez saisir au moins 3 symptômes.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/analyser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ symptomes: symptomesInitiaux }),
            });
            const data = await response.json();
            setMaladiesProbables(data.maladies_probables || []);
            setQuestions(data.questions_complementaires || []);
            navigate("/questions");
        } catch (error) {
            console.error("Erreur lors de l'envoi des symptômes :", error);
            alert("Erreur lors de la connexion au serveur backend.");
        }
    };

    return (
        <div className="accueil-page">
            <main className="accueil-main" style={{ maxWidth: "600px" }}>
                <h2 className="accueil-title" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
                    Saisie des symptômes
                </h2>

                <p className="accueil-intro" style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#004d40cc" }}>
                    Entrez vos symptômes un par un puis cliquez sur Ajouter.
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "2rem",
                    }}
                >
                    <input
                        type="text"
                        value={nouveauSymptome}
                        onChange={(e) => setNouveauSymptome(e.target.value)}
                        placeholder="Ex : fièvre"
                        style={{
                            flex: 1,
                            padding: "14px 18px",
                            borderRadius: "50px",
                            border: "2px solid #00796b",
                            fontSize: "1.1rem",
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") ajouterSymptome();
                        }}
                    />
                    <button
                        onClick={ajouterSymptome}
                        className="btn-primary"
                        style={{
                            padding: "14px 25px",
                            borderRadius: "50px",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                            backgroundColor: "#00796b",
                            boxShadow: "0 6px 15px #004d4088",
                        }}
                    >
                        Ajouter
                    </button>
                </div>

                {symptomesInitiaux.length > 0 && (
                    <div style={{ marginBottom: "2rem" }}>
                        <h3 style={{ color: "#00796b", marginBottom: "0.8rem" }}>Symptômes ajoutés :</h3>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            {symptomesInitiaux.map((symptome, i) => (
                                <li
                                    key={i}
                                    style={{
                                        backgroundColor: "#004d40cc",
                                        color: "white",
                                        padding: "8px 14px",
                                        borderRadius: "50px",
                                        fontWeight: "600",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    {symptome}
                                    <button
                                        onClick={() => supprimerSymptome(symptome)}
                                        style={{
                                            background: "transparent",
                                            border: "none",
                                            color: "#ff8a80",
                                            cursor: "pointer",
                                            fontWeight: "900",
                                            fontSize: "1.1rem",
                                            lineHeight: "1",
                                        }}
                                        aria-label={`Supprimer ${symptome}`}
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={envoyerSymptomes}
                    className="btn-primary"
                    style={{ width: "100%", fontSize: "1.3rem" }}
                    disabled={symptomesInitiaux.length < 3}
                    title={symptomesInitiaux.length < 3 ? "Veuillez ajouter au moins 3 symptômes" : ""}
                >
                    Suivant
                </button>
            </main>
        </div>
    );
}

export default Symptomes;
