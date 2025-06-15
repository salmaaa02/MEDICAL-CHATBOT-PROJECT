import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Symptomes from "./components/Symptomes";
import Questions from "./components/Questions";
import Resultat from "./components/Resultats";

function App() {
  const navigate = useNavigate();
  const [symptomesInitiaux, setSymptomesInitiaux] = useState([]);
  const [inputSymptome, setInputSymptome] = useState("");
  const [maladiesProbables, setMaladiesProbables] = useState([]);
  const [questionsComplementaires, setQuestionsComplementaires] = useState([]);
  const [reponsesQuestions, setReponsesQuestions] = useState({});
  const [diagnostic, setDiagnostic] = useState(null);
  const [medecins, setMedecins] = useState([]);

  const ajouterSymptome = () => {
    const s = inputSymptome.trim().toLowerCase();
    if (s && !symptomesInitiaux.includes(s)) {
      setSymptomesInitiaux([...symptomesInitiaux, s]);
      setInputSymptome("");
    }
  };

  const envoyerSymptomes = async () => {
    if (symptomesInitiaux.length < 3) {
      alert("Veuillez saisir au moins 3 symptômes.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/analyser", {
        symptomes: symptomesInitiaux,
      });

      if (!response.data) {
        throw new Error("Pas de réponse du serveur");
      }

      console.log("Réponse du backend:", response.data); // Pour débogage

      setMaladiesProbables(response.data.maladies_probables || []);
      setQuestionsComplementaires(response.data.questions_complementaires || []);

      if (window.location.pathname !== "/questions") {
        navigate("/questions");
      }
    } catch (error) {
      console.error("Erreur complète:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      alert(error.response?.data?.message || "Erreur lors de l'analyse des symptômes");
    }
  };

  const handleReponseChange = (question, valeur) => {
    setReponsesQuestions({
      ...reponsesQuestions,
      [question]: valeur,
    });
  };

  const envoyerDiagnostic = async () => {
    try {
      const symptomesComplets = [
        ...symptomesInitiaux,
        ...Object.keys(reponsesQuestions).filter((q) => reponsesQuestions[q] === "oui"),
      ];

      const response = await axios.post("http://localhost:5000/diagnostic", {
        symptomes: symptomesComplets,
      });

      setDiagnostic(response.data.maladie || "Diagnostic non déterminé");
      setMedecins(response.data.medecin || []);
      navigate("/resultat");
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert("Erreur lors du diagnostic final");
    }
  };

  const onNouveauDiagnostic = () => {
    setSymptomesInitiaux([]);
    setInputSymptome("");
    setMaladiesProbables([]);
    setQuestionsComplementaires([]);
    setReponsesQuestions({});
    setDiagnostic(null);
    setMedecins([]);
    navigate("/symptomes");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/symptomes"
        element={
          <Symptomes
            symptomesInitiaux={symptomesInitiaux}
            setSymptomesInitiaux={setSymptomesInitiaux}
            inputSymptome={inputSymptome}
            setInputSymptome={setInputSymptome}
            ajouterSymptome={ajouterSymptome}
            envoyerSymptomes={envoyerSymptomes}
            setMaladiesProbables={setMaladiesProbables}
            setQuestionsComplementaires={setQuestionsComplementaires} // correction ici
          />
        }
      />

      <Route
        path="/questions"
        element={
          <Questions
            maladiesProbables={maladiesProbables}
            questionsComplementaires={questionsComplementaires}
            reponsesQuestions={reponsesQuestions}
            handleReponseChange={handleReponseChange}
            envoyerDiagnostic={envoyerDiagnostic}
          />
        }
      />

      <Route
        path="/resultat"
        element={
          <Resultat
            diagnostic={diagnostic}
            medecins={medecins}
            onNouveauDiagnostic={onNouveauDiagnostic}
          />
        }
      />
    </Routes>
  );
}

export default App;
