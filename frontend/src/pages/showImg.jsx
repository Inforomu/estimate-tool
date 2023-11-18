import React, { useState, useEffect } from 'react';

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
            .then((data) => {
                console.log(data);
                if (data && data.images && Array.isArray(data.images)) {
                    const dataArray = data.images.flat().map(item => ({
                        id: item.id,
                        imageData: item.image_data,
                        imageUrl: URL.createObjectURL(new Blob([new Uint8Array(item.image_data.data)], { type: 'image/jpeg' })),
                    }));
                    setDataImg(dataArray);
                } else {
                    console.error("Les données ne sont pas dans le format attendu");
                }
            })
            .catch((error) => {
                console.error(`Erreur lors de la récupération des données : ${error}`);
            });
    }, []);
    useEffect(() => {
        return () => {
            dataImg.forEach(img => {
                URL.revokeObjectURL(img.imageUrl);
            });
        };
    }, [dataImg]);

    return (
        <div>
            <div>
                {dataImg.map((img, index) => (
                    <img key={index} src={img.imageUrl} alt={`Image ${img.id}`} />
                ))}
            </div>
        </div>
    );
}
