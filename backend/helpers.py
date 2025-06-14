import json
from collections import defaultdict

def charger_symptomes():
    with open('symptoms.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def charger_docteurs():
    with open('doctors.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def analyser_symptomes_initiaux(symptomes_utilisateur):
    symptomes_utilisateur = [s.lower().strip() for s in symptomes_utilisateur]
    data_symptomes = charger_symptomes()
    maladies_probables = set()
    for symptome in symptomes_utilisateur:
        if symptome in data_symptomes:
            maladie, _ = data_symptomes[symptome]
            maladies_probables.add(maladie)
    symptomes_possibles = set()
    for symptome, (maladie, _) in data_symptomes.items():
        if maladie in maladies_probables and symptome not in symptomes_utilisateur:
            symptomes_possibles.add(symptome)
    return list(maladies_probables), sorted(list(symptomes_possibles))

def analyser_symptomes_finale(symptomes_complets):
    symptomes_complets = [s.lower().strip() for s in symptomes_complets]
    data_symptomes = charger_symptomes()
    compte_maladies = defaultdict(int)
    for symptome in symptomes_complets:
        if symptome in data_symptomes:
            maladie, _ = data_symptomes[symptome]
            compte_maladies[maladie] += 1
    if not compte_maladies:
        return "Inconnue"
    maladie_max = max(compte_maladies, key=compte_maladies.get)
    return maladie_max

def trouver_medecin(maladie):
    data_docteurs = charger_docteurs()
    resultats = []
    for doc in data_docteurs:
        if maladie in doc.get("maladies_traitees", []):
            resultats.append({
                "nom": doc.get("nom"),
                "specialite": doc.get("specialite"),
                "ville": doc.get("ville"),
                "adresse": doc.get("adresse"),
                "telephone": doc.get("telephone")
            })
    if not resultats:
        resultats.append({
            "nom": "Médecin Généraliste",
            "specialite": "Généraliste",
            "ville": "N/A",
            "adresse": "N/A",
            "telephone": "N/A"
        })
    return resultats
