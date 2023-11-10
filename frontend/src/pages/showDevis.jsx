import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CardDevis from '../components/cardDevis';
import { Link } from 'react-router-dom';
import backArrow from '../assets/backArrow.png'
import loadingImage from '../assets/loading.png'

export default function Client() {

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
        <section className='flex flex-col'>
            <div className='link-back w-20 m-10'>
                <Link to='/'>
                    <img src={backArrow} alt="" />
                </Link>
            </div>
            <h2 className='text-4xl text-center font-semibold'>Liste des Devis</h2>
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
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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