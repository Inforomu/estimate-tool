import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardClient from '../components/CardClient';
import loadingImage from '../assets/loading.png'
import SearchBar from '../components/SearchBar';

export default function Client() {

    const [clients, setClients] = useState([]);
    const [sortClients, setSortClients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = Cookies.get('token');
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`${apiUrl}/api/client`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La requête a échoué");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setClients(data);
                const sortedClients = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                const lastTenClients = sortedClients.slice(0, 10);
                setSortClients(lastTenClients);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des clients :", error);
                setError('Erreur lors de la récupération des clients :');
                setLoading(false);
            });
    }, []);

    return (
        <section className='flex flex-col w-full py-5'>
            <>
                <div className='title-signin mt-2 text-2xl font-semibold text-center '>
                    <h2>Liste des Clients</h2>
                </div>
                <SearchBar clients={clients} />
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
                            <div className=' font-varela-scss mt-2 py-4 mb-10 text-2xl font-semibold text-center text-green-500'>
                                <h2>Nos 10 derniers Clients</h2>
                            </div>
                            <div className="relative overflow-x-auto  md:mx-10">
                                <table className="w-full text-sm md:text-left rtl:text-right rounded shadow bg-green-600 text-center">
                                    <thead className="font-varela-scss text-xs text-white uppercase bg-green-600">
                                        <tr className='text-center'>
                                            <th scope="col" className="md:px-6 py-3">
                                                Nom
                                            </th>
                                            <th scope="col" className="md:px-6 py-3">
                                                Prenom
                                            </th>
                                            <th scope="col" className="md:px-6 py-3">
                                                Ville
                                            </th>
                                            <th scope="col" className="md:px-6 py-3">
                                                Code Postal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortClients.map((clients) => (
                                            <CardClient key={clients.id} clients={clients} />
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