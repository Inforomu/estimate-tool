import {React, useState} from 'react';


export default function FormDevis() {

    const [pictures, setPictures] = useState([]);
    const [power_contract, setPowerContract] = useState('');
    const [power_yg, setPowerYg] = useState('');

    const handleFileSave = (e) => {
        const files = e.target.files;
        const updatedPictures = [...pictures];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            updatedPictures.push(file);
        }
        setPictures(updatedPictures);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // A ajouter a dataFormData : contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging, charge_points, box_nb

        if (power_contract !== '') {
            const dataFormData = { power_contract, power_yg};
            console.log(dataFormData);

            try {
                const dataResponse = await fetch('http://localhost:3000/api/uploadformdevis/uploadformdevis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataFormData),
                });

                if (dataResponse.ok) {
                    const formDataResult = await dataResponse.json();
                    const formDataId = formDataResult.formDataId;
                    const imageformData = new FormData();
                    

                    for (let i = 0; i < pictures.length; i++) {
                        imageformData.append('image', pictures[i]);
                    }
                    imageformData.append('formDataId', formDataId);

                    try {
                        const imageResponse = await fetch('http://localhost:3000/api/uploadimg/uploadimg', {
                            method: 'POST',
                            body: imageformData,
                        });

                        if (imageResponse.ok) {
                            console.log('Upload img ok');
                        } else {
                            console.error('Problème lors du téléchargement de l\'image');
                        }
                    } catch (error) {
                        console.error('Requête error:', error);
                    }
                    console.log('Upload data ok');
                } else {
                    console.error('Problème lors du téléchargement des données');
                }
            } catch (error) {
                console.error('Requête error:', error);
            }
        }
    };

    return (
        <div>
            <h2>Devis</h2>
            <form className='test' encType="multipart/form-data" onSubmit={handleSubmit}>
                <input name="image" id="image" type="file" accept="image/*" capture="user" multiple onChange={handleFileSave} />
                <div className="image-container">
                    {pictures.map((picture, i) => (
                        <div key={i} className="image-item">
                            <img className='img' src={URL.createObjectURL(picture)} alt={`Photo ${i}`} />
                            <div className="button-container">
                                <button type="button" className="delete-button" onClick={() => handleDeletePicture(i)}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input-data">
                    <select
                        className="custom-dropdown"
                        required
                        value={power_contract}
                        onChange={(e) => setPowerContract(e.target.value)}
                    >
                        <option value="" disabled>Sélectionnez une option</option>
                        <option value="compteur-electromecanique">Compteur électromécanique</option>
                        <option value="compteur-electrique">Compteur électrique</option>
                        <option value="compteur-linky">Compteur Linky</option>
                        <option value="compteur-industriel">Compteur industriel</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        required
                        value={power_yg}
                        onChange={(e) => setPowerYg(e.target.value)}
                    >
                        <option value="" disabled>Sélectionnez une option</option>
                        <option value="tarif-jaune">Tarif jaune</option>
                        <option value="tarif-vert">Tarif vert</option>
                    </select>
                    <div className="underline"></div>
                </div>
                <button className='mt-5' type="submit">Soumettre</button>
            </form>          
        </div>               
    );
}