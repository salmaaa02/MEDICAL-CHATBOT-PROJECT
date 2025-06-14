from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers import analyser_symptomes_initiaux, analyser_symptomes_finale, trouver_medecin

app = Flask(__name__)
CORS(app)

@app.route('/')
def accueil():
    return "Bienvenue sur le backend du Chatbot Médical."

@app.route('/analyser', methods=['POST'])
def analyser():
    data = request.get_json()
    symptomes_initiaux = data.get('symptomes', [])
    maladies_probables, questions = analyser_symptomes_initiaux(symptomes_initiaux)
    return jsonify({
        "maladies_probables": maladies_probables,
        "questions_complementaires": questions
    })

@app.route('/diagnostic', methods=['POST'])
def diagnostic():
    data = request.get_json()
    symptomes_complets = data.get('symptomes', [])
    maladie = analyser_symptomes_finale(symptomes_complets)
    medecin = trouver_medecin(maladie)
    return jsonify({
        "maladie": maladie,
        "medecin": medecin
    })

if __name__ == '__main__':
    app.run(debug=True)
