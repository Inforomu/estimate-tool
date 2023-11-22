import React from 'react';
import { Link } from 'react-router-dom';

export default function CardDevis({ devis, onDelete }) {

    const handleDeleteDevis = () => {
        const confirmDelete = window.confirm('Voulez-vous supprimer ce devis ?');
        if (confirmDelete) {
            onDelete(devis.id);
        }
    }

    return (
        <div className="bg-white w-full h-full rounded-lg shadow-lg p-4 m-2">
            <p><span className='paragraph-card-devis font-bold'>Relever terrain effectuer par:</span> {devis.user_email}</p>
            <p><span className='paragraph-card-devis font-bold'>Pour le dossier client: </span> {devis.client_email}</p>
            <div className='flex justify-between mt-2'>
                <button 
                    type="button"
                    className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-2 rounded transition-all duration-300" 
                    onClick={handleDeleteDevis}>
                    Supprimer
                </button>
                <Link
                    to={`/devis/${devis.id}`}
                    className="bg-white border text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-2 rounded transition-all duration-300"
                    > 
                        Voir Détails
                </Link>
            </div>
        </div>
    );
}

