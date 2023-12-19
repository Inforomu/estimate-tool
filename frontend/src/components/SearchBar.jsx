import { useState } from 'react';
import CardClient from './CardClient';

const SearchBar = ({ clients }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);

    const handleClientChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterClients(term);
    };

    const filterClients = (term) => {
        const filtered = clients.filter(client =>
            client.nom.toLowerCase().includes(term.toLowerCase()) ||
            client.prenom.toLowerCase().includes(term.toLowerCase()) ||
            client.ville.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterClients(searchTerm);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex justify-center py-10 '>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Recherche
                </label>
                <div className="relative w-full sm:w-2/3 md:w-1/2">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className=" shadow w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-green-600 "
                        placeholder="Recherche du client par nom, prenom, email"
                        onChange={handleClientChange}
                        required
                    />
                    <button
                        type="submit"
                        className="absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 border text-green-500 shadow-lg hover:bg-green-500 hover:text-white bg-white  transition-all duration-300 "
                    >
                        Recherche
                    </button>
                </div>
                
            </form>
            {searchTerm && (
                <div className="relative overflow-x-auto  md:mx-10">
                <table className="w-full text-sm text-left rtl:text-right rounded shadow bg-green-600">
                    <thead className="font-varela-scss text-xs text-white uppercase bg-green-600">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Prenom
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Ville
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Code Postal
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredClients.map(client => (
                        <CardClient key={client.id} clients={client}/>
                    ))}
                    </tbody>
                </table>
            </div>

            )}
            <hr className='h-px my-5 bg-gray-800 shadow'/>

        </>
    );
};

export default SearchBar;