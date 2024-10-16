const Product = require('../model/prodModel.js'); // Import du modèle produit

// Ajouter un nouveau produit
exports.create = (req, res) => {
    // Valider la requête
    if (!req.body.nom || !req.body.description || !req.body.prix) {
        return res.status(400).send({
            message: "Les champs nom, description, et prix sont obligatoires"
        });
    }

    // Créer un nouveau produit
    const product = new Product({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix
    });

    // Enregistrer le produit dans la base de données
    product.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création du produit."
            });
        });
};

// Récupérer tous les produits
exports.findAll = (req, res) => {
    Product.find()
        .then(products => {
            res.send(products);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des produits."
            });
        });
};

// Récupérer un seul produit par son ID
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId
                });
            }
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la récupération du produit avec l'ID " + req.params.productId
            });
        });
};

// Mettre à jour un produit par son ID
exports.update = (req, res) => {
    // Valider la requête
    if (!req.body.nom || !req.body.description || !req.body.prix) {
        return res.status(400).send({
            message: "Les champs nom, description, et prix sont obligatoires"
        });
    }

    // Trouver et mettre à jour le produit
    Product.findByIdAndUpdate(req.params.productId, {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId
                });
            }
            res.send(product);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la mise à jour du produit avec l'ID " + req.params.productId
            });
        });
};

// Supprimer un produit par son ID
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Produit non trouvé avec l'ID " + req.params.productId
                });
            }
            res.send({ message: "Produit supprimé avec succès!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la suppression du produit avec l'ID " + req.params.productId
            });
        });
};
