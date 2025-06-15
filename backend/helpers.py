import json
from collections import defaultdict

# Dictionnaire de questions par maladie
questions_par_maladie = {
    "Grippe": ["Avez-vous des frissons ?", "Votre température est-elle supérieure à 38°C ?", "Avez-vous le nez qui coule ?"],
    "Migraine": ["Avez-vous une sensibilité à la lumière ?", "Ressentez-vous des nausées ?", "Les douleurs sont-elles d’un seul côté de la tête ?"],
    "Angine": ["Avez-vous mal à la gorge ?", "Avez-vous des ganglions au cou ?", "Avez-vous de la fièvre ?"],
    "Anémie": ["Vous sentez-vous essoufflé à l'effort ?", "Avez-vous des vertiges fréquents ?", "Avez-vous la peau pâle ?"],
    "Allergie": ["Avez-vous le nez qui coule ou qui gratte ?", "Avez-vous des éternuements fréquents ?", "Êtes-vous en contact avec des allergènes connus ?"],
    "Alzheimer": ["Oubliez-vous souvent les événements récents ?", "Avez-vous du mal à trouver vos mots ?", "Avez-vous des difficultés à accomplir des tâches simples ?"],
    "Asthme": ["Votre respiration est-elle sifflante ?", "Avez-vous des crises nocturnes ?", "Avez-vous des antécédents familiaux d’asthme ?"],
    "Hypertension": ["Avez-vous des maux de tête fréquents ?", "Avez-vous des vertiges ?", "Votre tension a-t-elle déjà été mesurée comme élevée ?"],
    "Arthrose": ["Les douleurs augmentent-elles avec l’effort ?", "Les articulations sont-elles raides le matin ?", "Avez-vous des craquements articulaires ?"],
    "Appendicite": ["La douleur s’intensifie-t-elle au côté droit ?", "Avez-vous perdu l’appétit ?", "Avez-vous des nausées ou vomissements ?"],
    "Infection urinaire": ["Avez-vous des douleurs en urinant ?", "Votre urine est-elle trouble ou odorante ?", "Ressentez-vous un besoin fréquent d’uriner ?"],
    "Gastro-entérite": ["Avez-vous eu un contact avec quelqu’un de malade récemment ?", "Avez-vous des diarrhées ?", "Ressentez-vous des crampes abdominales ?"],
    "Diabète": ["Avez-vous soif de manière excessive ?", "Avez-vous besoin d’uriner souvent ?", "Avez-vous une perte de poids inexpliquée ?"],
    "Parkinson": ["Avez-vous des raideurs musculaires ?", "Avez-vous des difficultés à initier un mouvement ?", "Tremblez-vous au repos ?"],
    "Thrombose": ["Avez-vous une jambe plus enflée que l’autre ?", "Ressentez-vous une douleur au mollet ?", "Avez-vous récemment voyagé en avion ou été immobilisé ?"],
    "Eczéma": ["Votre peau est-elle sèche et irritée ?", "Les démangeaisons sont-elles intenses ?", "Avez-vous des antécédents allergiques ?"],
    "Alopécie": ["La chute de cheveux est-elle soudaine ?", "Y a-t-il des zones spécifiques sans cheveux ?", "Avez-vous eu un stress ou changement hormonal récemment ?"],
    "Hypotension": ["Avez-vous des vertiges au lever ?", "Avez-vous déjà perdu connaissance ?", "Ressentez-vous une grande fatigue ?"],
    "Arythmie": ["Votre cœur bat-il de manière irrégulière ?", "Avez-vous des palpitations ?", "Ressentez-vous des essoufflements ou vertiges ?"],
    "Dépression": ["Vous sentez-vous triste sans raison ?", "Avez-vous perdu l’intérêt pour des activités que vous aimiez ?", "Avez-vous des troubles du sommeil ?"],
    "Insomnie": ["Avez-vous du mal à vous endormir ?", "Vous réveillez-vous souvent pendant la nuit ?", "Vous sentez-vous reposé le matin ?"],
    "Sclérose en plaques": ["Avez-vous des troubles de la vision ?", "Ressentez-vous des picotements ou engourdissements ?", "Avez-vous une faiblesse musculaire inhabituelle ?"],
    "Bronchite chronique": ["Avez-vous une toux persistante depuis plusieurs semaines ?", "Crachez-vous souvent ?", "Avez-vous déjà été exposé à des fumées ou polluants ?"],
    "Hernie discale": ["La douleur s’étend-elle vers la jambe ?", "La douleur augmente-t-elle avec l’effort ou en position assise prolongée ?", "Ressentez-vous des engourdissements ?"]
}

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

    # Ajouter les questions complémentaires selon les maladies détectées
    questions = []
    for maladie in maladies_probables:
        if maladie in questions_par_maladie:
            questions.extend(questions_par_maladie[maladie])

    return {
        "maladies_probables": list(maladies_probables),
        "symptomes_possibles": sorted(list(symptomes_possibles)),
        "questions_complementaires": questions
    }

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
