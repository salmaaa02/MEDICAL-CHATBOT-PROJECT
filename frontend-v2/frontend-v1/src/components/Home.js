import React from "react";
import "./Accueil.css";
import { useNavigate } from "react-router-dom"; // ← Ajout

const ChatbotIcon = ({ style }) => (
    <svg
        style={style}
        className="chatbot-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-label="Icône chatbot médical"
        role="img"
    >
        <circle cx="32" cy="32" r="30" fill="#4A90E2" />
        <rect x="22" y="26" width="20" height="12" fill="#fff" rx="3" ry="3" />
        <circle cx="26" cy="32" r="3" fill="#2C3E50" />
        <circle cx="38" cy="32" r="3" fill="#2C3E50" />
        <path
            d="M22 38l6 6 14-14"
            stroke="#2C3E50"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function Accueil() {
    const navigate = useNavigate(); // ← Ajout

    const icons = [
        { top: "5%", left: "10%", animationDelay: "0s" },
        { bottom: "10%", right: "15%", animationDelay: "3s" },
    ];

    return (
        <div className="accueil-page">
            <main className="accueil-main">
                <h1 className="accueil-title">Bienvenue sur MedBot</h1>
                <p className="accueil-intro">
                    Votre assistant médical intelligent pour un diagnostic rapide et
                    personnalisé.
                </p>
                <button
                    className="btn-primary"
                    onClick={() => {
                        console.log("Bouton 'Commencer le diagnostic' cliqué");
                        navigate("/symptomes");
                    }}
                >
                    Commencer le diagnostic
                </button>

                {icons.map((pos, i) => (
                    <ChatbotIcon
                        key={i}
                        style={{
                            ...pos,
                            animationDelay: pos.animationDelay,
                            opacity: 0.3,
                            width: "50px",
                            height: "50px",
                            pointerEvents: "none",
                        }}
                    />
                ))}
            </main>
        </div>
    );
}
