const Commande = require('../model/commandeModel.js');

// Créer une nouvelle commande
exports.create = (req, res) => {
    // Valider la requête
    if (!req.body.client || !req.body.produits) {
        return res.status(400).send({
            message: "Les champs client et produits sont obligatoires"
        });
    }

    // Créer une commande
    const commande = new Commande({
        client: req.body.client,
        produits: req.body.produits // Tableau de produits avec la quantité
    });

    // Enregistrer la commande dans la base de données
    commande.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création de la commande."
            });
        });
};

// Récupérer toutes les commandes
exports.findAll = (req, res) => {
    Commande.find().populate('produits.produit') // Remplir les détails du produit
        .then(commandes => {
            res.send(commandes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des commandes."
            });
        });
};

// Récupérer une commande par son ID
exports.findOne = (req, res) => {
    Commande.findById(req.params.commandeId).populate('produits.produit')
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "Commande non trouvée avec l'ID " + req.params.commandeId
                });
            }
            res.send(commande);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération de la commande avec l'ID " + req.params.commandeId
            });
        });
};

// Mettre à jour une commande par son ID
exports.update = (req, res) => {
    if (!req.body.client || !req.body.produits) {
        return res.status(400).send({
            message: "Les champs client et produits sont obligatoires"
        });
    }

    // Trouver et mettre à jour la commande
    Commande.findByIdAndUpdate(req.params.commandeId, {
        client: req.body.client,
        produits: req.body.produits
    }, { new: true }).populate('produits.produit')
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "Commande non trouvée avec l'ID " + req.params.commandeId
                });
            }
            res.send(commande);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour de la commande avec l'ID " + req.params.commandeId
            });
        });
};

// Supprimer une commande par son ID
exports.delete = (req, res) => {
    Commande.findByIdAndRemove(req.params.commandeId)
        .then(commande => {
            if (!commande) {
                return res.status(404).send({
                    message: "Commande non trouvée avec l'ID " + req.params.commandeId
                });
            }
            res.send({ message: "Commande supprimée avec succès!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la suppression de la commande avec l'ID " + req.params.commandeId
            });
        });
};
