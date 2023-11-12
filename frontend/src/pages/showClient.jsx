import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardClient from '../components/cardClient';
import backArrow from '../assets/backArrow.png';
import loadingImage from '../assets/loading.png'
import { Link } from 'react-router-dom';

export default function showClient() {

    const [clients, setClients] = useState([]);
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
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des clients :", error);
                setError('Erreur lors de la récupération des clients :');
                setLoading(false);
            });
    }, []);

    // const handleDelete = (id) => {

    //     const deleteClients = clients.filter(clientsIndex => clientsIndex.id !== id);
    //     setClients(deleteClients);
    //     console.log('Suppression du client:', id);
    // }

    return (
        <section className='flex flex-col w-full'>
            <>
                {loading ? (
                    <div className="loading-image text-center">
                    <img src={loadingImage} alt="" />
                </div>
                ) : (
                    error ? (
                        <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className='link-back w-20 ml-24 mt-10 fixed top-0'>
                                <Link to='/'>
                                    <img src={backArrow} alt="" />
                                </Link>
                            </div>
                            <div className='mt-2 text-2xl font-semibold text-center underline'>
                            <h2>Liste des Clients</h2>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 m-20'>
                                {clients.map((clients) => (
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
