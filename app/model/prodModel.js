const mongoose = require('mongoose');

// Créer le schéma du produit
const ProductSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true // Le nom est obligatoire
    },
    description: {
        type: String,
        required: true // La description est obligatoire
    },
    prix: {
        type: Number,
        required: true // Le prix est obligatoire
    },
    images: {
        type: [String], // Tableau de chaînes de caractères pour stocker les URLs ou les noms des images
        required: false
    }
}, {
    timestamps: true // Ajoute des champs de date de création et de mise à jour
});

// Exporter le modèle basé sur ce schéma
module.exports = mongoose.model('Product', ProductSchema);
