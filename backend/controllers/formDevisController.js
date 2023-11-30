const FormData = require('../models/formDevis');

exports.submitForm = async (req, res) => {
    try {
        const userId = req.userID;
        console.log('Données reçues du formulaire :', req.body, req.userID);
        const formData = new FormData({
            
            power_contract: req.body.power_contract,
            power_yg: req.body.power_yg,
            contract: req.body.contract,
            electric_controller: req.body.electric_controller,
            telereport: req.body.telereport,
            wifi: req.body.wifi,
            mobile: req.body.mobile,
            ground_res: req.body.ground_res,
            neutral_system: req.body.neutral_system,
            breaker: req.body.breaker,
            distance: req.body.distance,
            secure: req.body.secure,
            type_e: req.body.type_e,
            dispo_td: req.body.dispo_td,
            power_charging: req.body.power_charging,
            charge_points: req.body.charge_points,
            box_nb: req.body.box_nb,
            author_id: req.userID, 
            client_id: req.body.client_id,
            observation: req.body.observation,
        });

        const formDataResult = await formData.save(formData, userId);
        const formDataId = formDataResult.insertId;

        console.log(formDataId);
        console.log('Save formulaire ok');
        res.status(201).json({ message: 'Données du formulaire enregistrées avec succès', formDataId });

    } catch (error) {
        console.error('Erreur save formulaire :', error);
        res.status(500).json({ error: 'Erreur save formulaire' });
    }
};

exports.getAllFormData = async (req, res) => {
    try {
        FormData.find()
            .then(data => res.status(200).json(data))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: 'Objet non Trouver' })
    }
}

exports.getOneDevis = async (req, res, next) => {
    try {
        const id = req.params.id;

        FormData.findOne(id)
            .then((devis) => {
                if (devis && devis[0] && devis[0].length > 0) {
                    res.status(200).json(devis[0]);
                    console.log(devis)
                } else {
                    res.status(404).json({ message: 'Client non trouvé' });
                }
            })
            .catch((error) => {
                console.error("Error when retrieving the item:", error);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.modifyOneDevis = async (req, res, next) => {
    try {
        const { id, power_contract } = req.body;
        await Devis.updateOneDevis(id, power_contract)
            .then(() => res.status(200).json({ message: 'Client modifié !' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}