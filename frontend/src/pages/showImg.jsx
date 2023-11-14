import React, { useState, useEffect } from 'react';

// Affichage image en test en cours !


export default function ShowImg() {
    const [dataImg, setDataImg] = useState([]);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        fetch(`${apiUrl}/api/uploadimg/showimg`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La requête a échoué");
                }
                return response.json();
            })
            .then((dataImg) => {
                console.log(dataImg);
                const dataArray = Object.values(dataImg);
                setDataImg(dataArray);
            })
            .catch((error) => {
                console.error(`Erreur lors de la récupération des données : ${error}`);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <div>
                {Array.isArray(dataImg) && dataImg.map((dataImg, index) => (
                    <img key={index} src={dataImg.image_data} alt={`Image ${dataImg.id}`} />
                ))}
            </div>
        </div>
  );
}
