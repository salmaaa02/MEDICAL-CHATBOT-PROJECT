const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques (HTML, JS, JSON, CSS...)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
