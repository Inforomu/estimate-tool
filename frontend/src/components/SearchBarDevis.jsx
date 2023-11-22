import React, { useState } from 'react'
import CardDevis from './cardDevis';


export default function SearchBarDevis( {devis} ) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDevis, setFilteredDevis] = useState([]);

    const handleDevisChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        filterDevis(term);
    }

    const filterDevis = (term) => {
        const filtered = devis.filter(devis => 
            devis.client_email.toLowerCase().includes(term.toLowerCase()) ||
            devis.user_email.toLowerCase().includes(term.toLowerCase()) ||
            devis.contract.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredDevis(filtered);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        filterDevis(searchTerm);
    }
  
  
    return (
        <div>
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
                        className="shadow w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-green-600"
                        placeholder="Recherche du devis par email du createur du devis ou email du client"
                        onChange={handleDevisChange}
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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 m-2 sm:m-5 md:m-10'>
                    {filteredDevis.map(devis => (
                        <CardDevis key={devis.id} devis={devis}/>
                    ))}
                </div>
            )}
            <hr className='h-px my-5 bg-gray-800 shadow'/>
        </div>
    )
}
