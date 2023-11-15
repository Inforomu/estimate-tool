import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function CardClient({ clients }) {

    return (
        <div className="bg-white w-full h-full rounded-lg shadow-lg sm:p-4 py-4 px-2">
            <div className='flex flex-col justify-between items-center'>
                <div>
                    <p><span className="font-bold">Nom du client :</span> {clients.nom}</p>
                    <p><span className="font-bold">Prenom du client :</span> {clients.prenom}</p>
                    <p><span className="font-bold">email :</span> {clients.email}</p>
                </div>
                <div className='w-3/4 xs:w-1/2 sm:w-full flex justify-around items-around flex-col sm:flex-row text-center'>
                    <Link
                    to={`/clients/${clients.id}`}
                    className="bg-white border text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-4 rounded transition-all duration-300"
                    > 
                        Voir Détails
                    </Link>
                    <Link
                    to={`/formdevis/${clients.id}`}
                    className="bg-white border text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-4 rounded transition-all duration-300"
                    >
                        Créer Devis
                    </Link>
                </div>
                
            </div>
        </div>
      );
}
