import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Client() {

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

    return (
        <section>
            <h2 className=' text-2xl font-semibold py-5'>Liste des Clients</h2>
            <>
                {loading ? (
                    <div className="text-center mt-5">
                        Loading...
                    </div>
                ) : (
                    error ? (
                        <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                            {error}
                        </div>
                    ) : (
                        <>
                            <div>
                                {/* CODE ICI */}
                            </div>
                        </>
                    )
                )}
            </>
        </section>
    )
}
