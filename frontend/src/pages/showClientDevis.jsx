import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
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
      	{devisResult.length === 0 ? (
        	<div className='flex justify-center items-center flex-col'>
          		<div className='font-varela-scss text-xl'>
            		<p>Aucun devis n'as ete cree pour ce client !</p>
          		</div>
          		<Link
              		to={`/clients`}
              		className="bg-white border font-varela-scss text-base text-green-500 mt-10 shadow hover:bg-green-500 hover:text-white mx-3 p-3 rounded transition-all duration-300"
          		>
              		Retourner aux clients
          		</Link>             
        	</div>
      	) : (
      		<ul>
        	{devisResult.map((devis) => (
           		<CardDevisDetail key={devis.id} devis={devis} returnPath='/clients'/>
        	))}
      		</ul>
      	)}
    </div>
  )
}
