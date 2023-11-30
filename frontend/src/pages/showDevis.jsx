import React, { useState, useEffect } from 'react'
import CardDevisDetail from '../components/cardDevisDetail'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

export default function showDevis() {

    const [devis, setDevis] = useState([]);
    const  {id}  = useParams();
    const [shouldFetchData, setShouldFetchData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = Cookies.get('token');
            const requestOptions = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
    
            const response = await fetch(`http://localhost:3000/api/uploadformdevis/${id}`, requestOptions);
            if (!response.ok) {
              throw new Error("La requête a échoué");
            }
    
            const data = await response.json();
            setDevis(data[0]);
            setShouldFetchData(false);
          } catch (error) {
            console.error("Erreur lors de la récupération du client :", error);
          }
        };
    
        fetchData();
    
      }, [shouldFetchData, id]);
    

  return (
    <div>
        <div className="bg-white border border-gray-200 rounded-lg ">
            <div className="p-5">
              <CardDevisDetail devis={devis} returnPath='/devis'/>
            </div>
        </div>
    </div>
  )
}
