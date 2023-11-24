import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import CardDevisDetail from '../components/cardDevisDetail';

export default function showClientDevis() {
    const { id } = useParams();
    const [devisResult, setDevisResult] = useState([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = Cookies.get('token');
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(`${apiUrl}/api/client/${id}/devis`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La requête a échoué");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setDevisResult(data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des clients :", error);
            });
    }, [, id]);

  return (
    <div>
      <ul>
        {devisResult.map((devis) => (
           <CardDevisDetail key={devis.id} devis={devis}/>
        ))}
      </ul>
    </div>
  )
}
