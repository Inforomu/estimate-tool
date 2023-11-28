import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardDevis from '../components/cardDevis';
import { Link } from 'react-router-dom';
import backArrow from '../assets/backArrow.png'
import loadingImage from '../assets/loading.png';
import SearchBarDevis from '../components/SearchBarDevis';

export default function Devis() {

    const [devis, setDevis] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sortDevis, setSortDevis] = useState([]);



    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = Cookies.get('token');
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`${apiUrl}/api/uploadformdevis`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La requête a échoué");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setDevis(data);
                const sortedDevis = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const lastTenDevis = sortedDevis.slice(0, 10);
                setSortDevis(lastTenDevis)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des devis :", error);
                setError('Erreur lors de la récupération des devis :');
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {

        const deleteDevis = devis.filter(devisIndex => devisIndex.id !== id);
        setDevis(deleteDevis);
        console.log('Suppression du devis:', id);
    }

    return (
        <section className='flex flex-col w-full'>
            <>
                {loading ? (
                    <div className="text-center w-full flex justify-center">
                        <img src={loadingImage} className='loading-image text-center' alt="" />
                    </div>
                ) : (
                    error ? (
                        <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                            {error}
                        </div>
                    ) : (
                        <>  
                            <div>
                                <h2 className='title-signin font-semibold py-2 text-center underline'>Liste des Devis
                                </h2>
                            </div>
                            <SearchBarDevis devis={devis} />
                            <div classname='relative overflow-x-auto md: mx-10'>
                            <table className="w-full text-sm text-left rtl:text-right rounded shadow bg-green-600">
                                    <thead className="font-varela-scss text-xs text-white uppercase bg-green-600">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Nom du client
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Créateur du devis
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
                                        {sortDevis.map((devis) => (
                                            <CardDevis key={devis.id} devis={devis} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                )}
            </>
        </section>
    )
}