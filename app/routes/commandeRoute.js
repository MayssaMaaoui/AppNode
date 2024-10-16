module.exports = (app) => {
    const Commande = require('../controllers/commandeController.js');

    // Créer une nouvelle commande
    app.post('/commandes/create', Commande.create);

    // Autres routes pour les commandes
    app.get('/commandes', Commande.findAll);
    app.get('/commandes/:commandeId', Commande.findOne);
    app.put('/commandes/:commandeId', Commande.update);
    app.delete('/commandes/:commandeId', Commande.delete);
};
