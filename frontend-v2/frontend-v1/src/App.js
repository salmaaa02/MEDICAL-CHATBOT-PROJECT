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
    const s = inputSymptome.trim();
    if (s && !symptomesInitiaux.includes(s)) {
      setSymptomesInitiaux([...symptomesInitiaux, s]);
      setInputSymptome("");
    }
  };

  const ajouterEtEnvoyerSymptomes = async (navigate) => {
    const s = inputSymptome.trim();
    let nouveauxSymptomes = [...symptomesInitiaux];

    // ajouter localement le dernier symptôme saisi (sans dépendre du setState)
    if (s && !nouveauxSymptomes.includes(s)) {
      nouveauxSymptomes.push(s);
    }
    console.log("Symptômes envoyés :", nouveauxSymptomes);

    if (nouveauxSymptomes.length < 3) {
      alert("Veuillez saisir au moins 3 symptômes.");
      return;
    }

    // mettre à jour l'état aussi pour la suite du parcours
    setSymptomesInitiaux(nouveauxSymptomes);
    setInputSymptome("");

    try {
      const res = await axios.post("http://localhost:5000/analyser", {
        symptomes: nouveauxSymptomes,
      });
      setMaladiesProbables(res.data.maladies_probables || []);
      setQuestionsComplementaires(res.data.questions_complementaires || []);
      setMedecins(res.data.medecin || []);
      navigate("/questions");
    } catch (error) {
      alert("Erreur lors de la connexion au serveur backend.");
      console.error(error);
    }
  };

  const handleReponseChange = (question, valeur) => {
    setReponsesQuestions({
      ...reponsesQuestions,
      [question]: valeur,
    });
  };

  const envoyerDiagnostic = async (navigate) => {
    let symptomesComplets = [...symptomesInitiaux];
    for (const [question, reponse] of Object.entries(reponsesQuestions)) {
      if (reponse === "oui") {
        symptomesComplets.push(question);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/diagnostic", {
        symptomes: symptomesComplets,
      });
      setDiagnostic(res.data.maladie);
      setMedecins(res.data.medecin);
      navigate("/resultat");
    } catch (error) {
      alert("Erreur lors de la connexion au serveur backend.");
      console.error(error);
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
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/symptomes"
        element={
          <Symptomes
            symptomesInitiaux={symptomesInitiaux}
            inputSymptome={inputSymptome}
            setInputSymptome={setInputSymptome}
            setSymptomesInitiaux={setSymptomesInitiaux}        // <-- Ajouté ici
            ajouterSymptome={ajouterSymptome}
            envoyerSymptomesInitiaux={ajouterEtEnvoyerSymptomes}
          />
        }
      />
      <Route
        path="/questions"
        element={
          <Questions
            questionsComplementaires={questionsComplementaires}
            reponsesQuestions={reponsesQuestions}
            handleReponseChange={handleReponseChange}
            envoyerDiagnostic={() => envoyerDiagnostic(navigate)}
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
