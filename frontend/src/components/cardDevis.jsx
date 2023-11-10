import React from 'react';

export default function CardDevis({ devis }) {
    return (
        <div className="bg-white w-full h-full rounded-lg shadow-lg p-4 m-2">
            <h2 className=''> <span className='font-bold'>Puissance souscrite:</span> {devis.power_contract}</h2>
            <h2><span className='font-bold'>Puissance souscrite (tarif jaune ou vert):</span> {devis.power_yg}</h2>
            <h2><span className='font-bold'>Contrat:</span> {devis.contract}</h2>
            <h2><span className='font-bold'>Compteur electronique:</span> {devis.electric_controller}</h2>
            <h2><span className='font-bold'>Connexion telereport:</span> {devis.telereport}</h2>
            <h2><span className='font-bold'>Couverture Wifi:</span> {devis.wifi}</h2>
            <h2><span className='font-bold'>Couverture Mobile:</span> {devis.mobile}</h2>
            <h2><span className='font-bold'>Systeme de resistance a la terre:</span> {devis.ground_res}</h2>
            <h2><span className='font-bold'>Systeme de neutre:</span> {devis.neutral_system}</h2>
            <h2><span className='font-bold'>Calibre disjoncteur generale:</span> {devis.breaker}</h2>
            <h2><span className='font-bold'>Distance entre le TD et la ou les bornes:</span> {devis.distance}</h2>
            <h2><span className='font-bold'>Type de securite de charge:</span> {devis.secure}</h2>
            <h2><span className='font-bold'>Besoin d'une prise type E:</span> {devis.type_e}</h2>
        </div>
    );
}

