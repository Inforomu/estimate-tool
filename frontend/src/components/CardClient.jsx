import { Link } from 'react-router-dom';


export default function CardClient({ clients }) {

    return (
        <tr className="bg-white border hover:border-y-2 hover:font-semibold hover:border-y-green-500 hover:text-black transition ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {clients.nom}
            </th>
            <td className="px-6 py-4">
                {clients.prenom}
            </td>
            <td className="px-6 py-4">
                {clients.ville}
            </td>
            <td className='flex flex-wrap md:flex-none p-1'>
                <Link
                    to={`/clients/${clients.id}`}
                    className="bg-white border text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Voir Détails
                </Link>
                <Link
                    to={`/formdevis/${clients.id}`}
                    className="bg-white border text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Créer Devis
                </Link>
                <Link
                    to={`/clients/${clients.id}/devis`}
                    className="bg-white border text-green-500 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
                >
                    Voir devis
                </Link>
            </td>
        </tr>
    );
}

