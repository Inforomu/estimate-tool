import React from 'react';

export default function CardDevis({ devis, onDelete }) {

    const handleDeleteDevis = (i) => {
        const confirmDelete = window.confirm('Voulez-vous supprimer ce devis ?');
        if (confirmDelete) {
            onDelete(devis.id);
        }
    }

    return (
        <div className="bg-white w-full h-full rounded-lg shadow-lg p-4 m-2">
            <p><span className='font-bold'>Puissance souscrite:</span> {devis.power_contract}</p>
            <p><span className='font-bold'>Puissance souscrite (tarif jaune ou vert):</span> {devis.power_yg}</p>
            <p><span className='font-bold'>Contrat:</span> {devis.contract}</p>
            <p><span className='font-bold'>Compteur electronique:</span> {devis.electric_controller}</p>
            <p><span className='font-bold'>Connexion telereport:</span> {devis.telereport}</p>
            <p><span className='font-bold'>Couverture Wifi:</span> {devis.wifi}</p>
            <p><span className='font-bold'>Couverture Mobile:</span> {devis.mobile}</p>
            <p><span className='font-bold'>Systeme de resistance a la terre:</span> {devis.ground_res}</p>
            <p><span className='font-bold'>Systeme de neutre:</span> {devis.neutral_system}</p>
            <p><span className='font-bold'>Calibre disjoncteur generale:</span> {devis.breaker}</p>
            <p><span className='font-bold'>Distance entre le TD et la ou les bornes:</span> {devis.distance}</p>
            <p><span className='font-bold'>Type de securite de charge:</span> {devis.secure}</p>
            <p><span className='font-bold'>Besoin d'une prise type E:</span> {devis.type_e}</p>
            <p><span className='font-bold'>Disponibilite TD:</span> {devis.dispo_td}</p>
            <p><span className='font-bold'>Puissance de charge souhaiter:</span> {devis.power_charging}</p>
            <p><span className='font-bold'>Nombres de points de charges:</span> {devis.charge_points}</p>
            <p><span className='font-bold'>Nombres de bornes:</span> {devis.box_nb}</p>
            <p><span className='font-bold'>Relever terrain effectuer par:</span> {devis.author_id}</p>
            <button 
                type="button"
                className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-2 rounded transition-all duration-300" 
                onClick={handleDeleteDevis}>
                Supprimer
            </button>
        </div>
    );
}

