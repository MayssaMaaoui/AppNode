module.exports = (app) => {
    const Product = require('../controllers/prodController.js');

    // Créer un nouveau produit
    app.post('/products/create', Product.create);

    // Récupérer tous les produits
    app.get('/products', Product.findAll);

    // Récupérer un produit par son ID
    app.get('/products/:productId', Product.findOne);

    // Mettre à jour un produit par son ID
    app.put('/products/:productId', Product.update);

    // Supprimer un produit par son ID
    app.delete('/products/:productId', Product.delete);
};
