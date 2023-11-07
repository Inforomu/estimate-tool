const FormData = require('../models/formDevis');

exports.submitForm = async (req, res) => {
    try {
        console.log('Données reçues du formulaire :', req.body);
        const formData = new FormData({
            power_contract: req.body.power_contract,
            power_yg: req.body.power_yg
        });
        const formDataResult = await formData.save();
        const formDataId = formDataResult.insertId;
        console.log(formDataId);
        console.log('Save formulaire ok');
        res.status(201).json({ message: 'Données du formulaire enregistrées avec succès', formDataId });

    } catch (error) {
        console.error('Erreur save formulaire :', error);
        res.status(500).json({ error: 'Erreur save formulaire' });
    }
};