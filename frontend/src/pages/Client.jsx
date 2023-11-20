import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardClient from '../components/CardClient';
import loadingImage from '../assets/loading.png'
import SearchBar from '../components/SearchBar';

export default function showClient() {

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
                            <div className=' mt-2 text-2xl font-semibold text-center text-green-500'>
                                <h2>Nos derniers Clients (10)</h2>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 m-2 sm:m-5 md:m-10'>
                                {sortClients.map((clients) => (
                                    <CardClient key={clients.id} clients={clients}/>
                                ))}
                            </div>
                        </>
                    )
                )}
            </>
        </section>
    )
}
