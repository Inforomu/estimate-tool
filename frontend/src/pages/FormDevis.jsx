import {React, useState} from 'react';


export default function FormDevis() {

    const [pictures, setPictures] = useState([]);
    const [power_contract, setPowerContract] = useState('');
    const [power_yg, setPowerYg] = useState('');
    const [contract, setContract] = useState('');
    const [electric_controller, setElectric_controller] = useState('');
    const [telereport, setTelereport] = useState('');
    const [wifi, setWifi] = useState('');
    const [mobile, setMobile] = useState('');
    const [ground_res, setGround_res] = useState('');
    const [neutral_system, setNeutral_system] = useState('');
    const [breaker, setBreaker] = useState('');
    const [distance, setDistance] = useState('');
    const [secure, setSecure] = useState('');
    const [type_e, setType_e] = useState('');
    const [dispo_td, setDispo_td] = useState('');
    const [power_charging, setPower_charging] = useState('');
    const [charge_points, setCharge_points] = useState('');
    const [box_nb, setBox_nb] = useState('');

    const handleFileSave = (e) => {
        const files = e.target.files;
        const updatedPictures = [...pictures];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            updatedPictures.push(file);
        }
        setPictures(updatedPictures);
    };

    const handleDeletePicture = (i) => {
        const updatedPictures = [...pictures];
        updatedPictures.splice(i, 1);
        setPictures(updatedPictures);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // A ajouter a dataFormData : contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging, charge_points, box_nb

        if (power_contract !== '') {
            const dataFormData = { power_contract, power_yg, contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging, charge_points, box_nb};
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
                        <option value="" disabled>Puissance souscrite</option>
                        <option value="Bleu-6-KvA">Bleu-monophase-6 KvA</option>
                        <option value="Bleu-9-KvA">Bleu-monophase-9 KvA</option>
                        <option value="Bleu-12-KvA">Bleu-monophase-12 KvA</option>
                        <option value="Bleu-Triphase-15 KvA">Bleu-Triphase-15 KvA</option>
                        <option value="Bleu-Triphase-18 KvA">Bleu-Triphase-18 KvA</option>
                        <option value="Bleu-Triphase-24 KvA">Bleu-Triphase-24 KvA</option>
                        <option value="Bleu-Triphase-30 KvA">Bleu-Triphase-30 KvA</option>
                        <option value="Bleu-Triphase-36 KvA">Bleu-Triphase-36 KvA</option>
                        <option value="Tarif Jaune">Tarif Jaune</option>
                        <option value="Tarif Vert">Tarif Vert</option>
                    </select>
                    <input type="text" value={power_yg} placeholder='Puissance souscrite (tarif jaune ou vert)' onChange={(e) => setPowerYg(e.target.value)}/>
                    <select
                        className="custom-dropdown"
                        value={contract}
                        onChange={(e) => setContract(e.target.value)}
                    >
                        <option value="" disabled>Contrat(Tarif bleu mono)</option>
                        <option value="Base">Base</option>
                        <option value="HC">HC</option>
                        <option value="EJP">EJP</option>
                        <option value="Tempo">Tempo</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        required
                        value={electric_controller}
                        onChange={(e) => setElectric_controller(e.target.value)}
                    >
                        <option value="" disabled>Compteur electronique</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        value={telereport}
                        onChange={(e) => setTelereport(e.target.value)}
                    >
                        <option value="" disabled>Borne de connexion telereport(tarif bleu)</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        required
                        value={wifi}
                        onChange={(e) => setWifi(e.target.value)}
                    >
                        <option value="" disabled>Couverture Wifi</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    >
                        <option value="" disabled>Couverture Mobile</option>
                        <option value="oui-3G">Oui - 3G</option>
                        <option value="oui-4G">Oui - 4G</option>
                        <option value="oui-5G">Oui - 5G</option>
                        <option value="non">Non</option>
                    </select>
                    <input type="text" value={ground_res} required placeholder='Valeur de resistance de terre' onChange={(e) => setGround_res(e.target.value)}/>
                    <select
                        className="custom-dropdown"
                        value={neutral_system}
                        onChange={(e) => setNeutral_system(e.target.value)}
                    >
                        <option value="" disabled>Regime de neutre (tarif vert)</option>
                        <option value="TT">TT</option>
                        <option value="TNS">TNS</option>
                        <option value="TNC">TNC</option>
                        <option value="IT">IT</option>
                    </select>
                    <div className="underline"></div>
                    <input type="text" value={breaker}  required placeholder='Calibre disjoncteur general' onChange={(e) => setBreaker(e.target.value)}/>
                    <input type="text" value={distance} required placeholder='Distance entre le TD et la borne' onChange={(e) => setDistance(e.target.value)}/>
                    <select
                        className="custom-dropdown"
                        required
                        value={secure}
                        onChange={(e) => setSecure(e.target.value)}
                    >
                        <option value="" disabled>Securite de charge</option>
                        <option value="Clé">Clé</option>
                        <option value="Badge RFID">Badge(s) RFID</option>
                        <option value="Application">Application smartphone</option>
                        <option value="Pas de securite">Pas de securite</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        required
                        value={type_e}
                        onChange={(e) => setType_e(e.target.value)}
                    >
                        <option value="" disabled>Besoin prise type E</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                    <select
                        className="custom-dropdown"
                        required
                        value={dispo_td}
                        onChange={(e) => setDispo_td(e.target.value)}
                    >
                        <option value="" disabled>Emplacement dispo TD</option>
                        <option value="Oui 2 Modules disponibles">Oui - 2 Modules disponibles</option>
                        <option value="Oui 3 Modules disponibles">Oui - 3 Modules disponibles</option>
                        <option value="Oui 4 Modules disponibles">Oui - 4 Modules disponibles</option>
                        <option value="Oui 5 Modules disponibles">Oui - 5 Modules disponibles</option>
                        <option value="Oui 6 Modules disponibles">Oui - 6 Modules disponibles</option>
                        <option value="Oui 7 Modules disponibles">Oui - 7 Modules disponibles</option>
                        <option value="Oui 8 Modules disponibles">Oui - 8 Modules disponibles</option>
                        <option value="Oui 9 et + Modules disponibles">Oui - 9 et + Modules disponibles</option>
                        <option value="Non Besoin d'un nouveau tableau">Non - Besoin d'un nouveau tableau</option>
                    </select>
                    <input type="text" value={power_charging} required placeholder='Puissance de charge en Kw/H souhaiter' onChange={(e) => setPower_charging(e.target.value)}/>
                    <input type="text" value={charge_points} required placeholder='Nombre(s) de point(s) de charge(s) souhaiter' onChange={(e) => setCharge_points(e.target.value)}/>
                    <input type="text" value={box_nb} required placeholder='Nombre(s) de borne(s)' onChange={(e) => setBox_nb(e.target.value)}/>
                </div>
                <button className='mt-5' type="submit">Soumettre</button>
            </form>          
        </div>               
    );
}