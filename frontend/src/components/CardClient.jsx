import { Link } from 'react-router-dom';


export default function CardClient({ clients }) {

    return (
        <tr className="font-varela-scss bg-white border-b-4 hover:border-green-500 hover:text-black transition ease-in-out duration-300">
            <th scope="row" className="mt-20 px-6 py-4 text-gray-900 whitespace-nowrap">
            <span className='text-base'>{clients.nom}</span>
            </th>
            <td className="px-6 py-4">
                <span className='text-base'>{clients.prenom}</span>
            </td>
            <td className="px-6 py-4">
                <span className='text-base'>{clients.ville}</span>
            </td>
            <td className="px-6 py-4">
                <span className='text-base'>{clients.zipcode}</span>
            </td>
            <td className='flex flex-wrap md:flex-none p-1'>
                <Link
                    to={`/clients/${clients.id}`}
                    className="bg-white border text-base text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Voir Détails
                </Link>
                <Link
                    to={`/formdevis/${clients.id}`}
                    className="bg-white border text-base text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Créer Devis
                </Link>
                <Link
                    to={`/clients/${clients.id}/devis`}
                    className="bg-white border text-base text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Voir devis
                </Link>
            </td>
        </tr>
    );
}

