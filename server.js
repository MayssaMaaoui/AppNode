const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connexion à MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://mayssamaaoui:Z1dEj03kP4FJlRtJ@cluster0.gnu8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true // Ajoutez cette option pour éviter les avertissements
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
});

const app = express();

// Middleware pour parser les données URL et JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route de base
app.get("/", (req, res) => {
    res.json({ message: "Server is running :D" });
});

// Définir le port
let PORT = 8080;

// Charger les routes des produits
require('./app/routes/Productroute.js')(app);

// Charger les routes des commandes
require('./app/routes/commandeRoute.js')(app);

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
