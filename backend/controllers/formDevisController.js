const FormData = require('../models/formDevis');

exports.submitForm = async (req, res) => {
    try {
        console.log('Données reçues du formulaire :', req.body);
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
            box_nb: req.body.box_nb

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