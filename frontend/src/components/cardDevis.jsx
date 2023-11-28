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
        <tr className="font-varela-scss bg-white border-b-4 hover:border-green-500 hover:text-black transition ease-in-out duration-300">
            <th scope="row" className="mt-20 px-6 py-4 text-gray-900 whitespace-nowrap">
            <span className='text-base'>{devis.client_email}</span>
            </th>
            <td className="px-6 py-4">
                <span className='text-base'>{devis.user_email}</span>
            </td>
            <td className="px-6 py-4">
                <span className='text-base'>{devis.client_ville}</span>
            </td>
            <td className="px-6 py-4">
                <span className='text-base'>{devis.client_zipcode}</span>
            </td>
            <td className='flex flex-wrap md:flex-none p-1'>
                
                <Link
                    to={`/devis/${devis.id}`}
                    className="bg-white border text-base text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Voir devis
                </Link>
            </td>
        </tr>
    );
}

