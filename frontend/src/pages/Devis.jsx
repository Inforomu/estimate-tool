import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardDevis from '../components/cardDevis';
import { Link } from 'react-router-dom';
import backArrow from '../assets/backArrow.png'
import loadingImage from '../assets/loading.png'

export default function Devis() {

    const [devis, setDevis] = useState([]);
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
                            <h2 className='title-signin font-semibold py-2 text-center underline'>Liste des Devis</h2>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 m-20'>
                                {devis.map((devis) => (
                                    <CardDevis key={devis.id} devis={devis} onDelete={handleDelete}/>
                                ))}
                            </div>
                        </>
                    )
                )}
            </>
        </section>
    )
}