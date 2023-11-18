import React from 'react'
import { Link } from 'react-router-dom';

export default function cardDevisDetail({ devis }) {

    // const handleDeleteDevis = () => {
    //     const confirmDelete = window.confirm('Voulez-vous supprimer ce devis ?');
    //     if (confirmDelete) {
    //       onDelete(devis.id);
    //     };
    // }
    // Ajouter delete ici et pas dans le cardDevis avec logique back pour les admins.

    return (
        <div className='w-full h-full'>
            <div>
                <h2 className='paragraph-card-devis text-center text-xl text-green-500'>Details du relever terrain :</h2>
            </div>
                <div className='w-full p-6 paragraph-card-devis'>
                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Puissance souscrite:</span> <span className='ml-1 text-green-500 font-bold'>{devis.power_contract}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Puissance souscrite (tarif jaune ou vert):</span> <span className='ml-1 text-green-500 font-bold'>{devis.power_yg}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Contrat:</span> <span className='ml-1 text-green-500 font-bold'>{devis.contract}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Compteur electronique:</span> <span className='ml-1 text-green-500 font-bold'>{devis.electric_controller}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Connexion telereport:</span> <span className='ml-1 text-green-500 font-bold'>{devis.telereport}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Couverture Wifi:</span> <span className='ml-1 text-green-500 font-bold'>{devis.wifi}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Couverture Mobile:</span> <span className='ml-1 text-green-500 font-bold'>{devis.mobile}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Systeme de resistance a la terre:</span> <span className='ml-1 text-green-500 font-bold'>{devis.ground_res}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Systeme de neutre:</span> <span className='ml-1 text-green-500 font-bold'>{devis.neutral_system}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Calibre disjoncteur generale:</span> <span className='ml-1 text-green-500 font-bold'>{devis.breaker}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Distance entre le TD et la ou les bornes:</span> <span className='ml-1 text-green-500 font-bold'>{devis.distance}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Type de securite de charge:</span> <span className='ml-1 text-green-500 font-bold'>{devis.secure}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Besoin d'une prise type E:</span> <span className='ml-1 text-green-500 font-bold'>{devis.type_e}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Disponibilite TD:</span> <span className='ml-1 text-green-500 font-bold'>{devis.dispo_td}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Puissance de charge souhaiter:</span> <span className='ml-1 text-green-500 font-bold'>{devis.power_charging}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Nombres de points de charges:</span> <span className='ml-1 text-green-500 font-bold'>{devis.charge_points}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Nombres de bornes:</span> <span className='ml-1 text-green-500 font-bold'>{devis.box_nb}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Relever terrain effectuer par:</span> <span className='ml-1 text-green-500 font-bold'>{devis.user_email}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Numero de devis:</span> <span className='ml-1 text-green-500 font-bold'>{devis.id}</span></p>

                    <div className='flex justify-between mt-2'>
                        <Link
                        to={`/devis`}
                        className="bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 m-1 px-4 py-2 m-1 rounded transition-all duration-300"
                        > 
                            Retour aux devis
                        </Link>

                        <button 
                        type="button"
                        className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 m-1 px-4 py-2 m-1 rounded transition-all duration-300" 
                        >
                            Voir les photos
                        </button>
                    </div>
                </div>
        </div>
    );
}

// onClick={showImgDevis}
