const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour un produit dans une commande (produit + quantité)
const ProduitCommandeSchema = new Schema({
    produit: { 
        type: Schema.Types.ObjectId, 
        ref: 'Produit', // Référence au modèle 'Produit'
        required: true 
    },
    quantite: { 
        type: Number, 
        required: true 
    }
});

// Schéma pour la commande
const CommandeSchema = new Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    client: { 
        type: String, 
        required: true 
    },
    produits: [ProduitCommandeSchema] // Tableau des produits et quantités
});

module.exports = mongoose.model('Commande', CommandeSchema);
