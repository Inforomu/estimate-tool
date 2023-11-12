import Cookies from 'js-cookie';
import {React, useState} from 'react';
import backArrow from '../assets/backArrow.png';
import trashImg from '../assets/supprimer.png';
import { Link } from 'react-router-dom';

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

    const resetForm = () => {
        setPictures([]);
        setPowerContract('');
        setPowerYg('');
        setContract('');
        setElectric_controller('');
        setTelereport('');
        setWifi('');
        setMobile('');
        setGround_res('');
        setNeutral_system('');
        setBreaker('');
        setDistance('');
        setSecure('');
        setType_e('');
        setDispo_td('');
        setPower_charging('');
        setCharge_points('');
        setBox_nb('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        // console.log(apiUrl)
        if (power_contract !== '') {
            const dataFormData = { power_contract, power_yg, contract, electric_controller, telereport, wifi, mobile, ground_res, neutral_system, breaker, distance, secure, type_e, dispo_td, power_charging, charge_points, box_nb};
            console.log(dataFormData);
            
            try {
                const token = Cookies.get('token');
                const dataResponse = await fetch(`${apiUrl}/api/uploadformdevis`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
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
                    const imageResponse = await fetch(`${apiUrl}/api/uploadimg/uploadimg`, {
                        method: 'POST',
                        body: imageformData,
                    });

                    if (imageResponse.ok) {
                        console.log('Upload img ok');
                    } else {
                        console.error('Problème lors du téléchargement de l\'image');
                    }
                    console.log('Upload data ok');
                    resetForm();
                } else {
                    console.error('Problème lors du téléchargement des données');
                }
            } catch (error) {
                console.error('Requête error:', error);
            }
        }
    };

    // Voir mettre back arrow dans l'app et mettre une maison a la place d'une fleche
    return (
        <div className='w-full m-4'>
            <div className='link-back w-20 mt-4 ml-20'>
                <Link to='/'>
                    <img src={backArrow} alt="" />
                </Link>
            </div>
            <h2 className='w-full text-center text-3xl font-bold underline py-2'>Relever terrain :</h2>
            <form className='test sm:mx-8 md:mx-16 lg:mx-48 bg-white shadow-xl p-6 rounded-xl' encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="input-data">
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
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
                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer' 
                            value={power_yg} 
                            placeholder='' 
                            onChange={(e) => setPowerYg(e.target.value)}
                            />
                            <label htmlFor="power_yg" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Puissance souscrite (tarif jaune ou vert)
                            </label>
                    </div>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
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
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
                        value={electric_controller}
                        onChange={(e) => setElectric_controller(e.target.value)}
                    >
                        <option value="" disabled>Compteur electronique</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
                        value={telereport}
                        onChange={(e) => setTelereport(e.target.value)}
                    >
                        <option value="" disabled>Borne de connexion telereport(tarif bleu)</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
                        value={wifi}
                        onChange={(e) => setWifi(e.target.value)}
                    >
                        <option value="" disabled>Couverture Wifi</option>
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    >
                        <option value="" disabled>Couverture Mobile</option>
                        <option value="oui-3G">Oui - 3G</option>
                        <option value="oui-4G">Oui - 4G</option>
                        <option value="oui-5G">Oui - 5G</option>
                        <option value="non">Non</option>
                    </select>
                    
                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text" 
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer' 
                            value={ground_res}
                            placeholder='' 
                            onChange={(e) => setGround_res(e.target.value)}
                        />
                        <label htmlFor="ground_res" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valeur de resistance de terre
                        </label>
                    </div>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
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
                    
                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer'
                            value={breaker}
                            placeholder='' 
                            onChange={(e) => setBreaker(e.target.value)}
                        />
                        <label htmlFor="breaker" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Calibre disjoncteur general
                        </label>
                    </div>

                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer'
                            value={distance}
                            placeholder='' 
                            onChange={(e) => setDistance(e.target.value)}
                        />
                        <label htmlFor="distance" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Distance entre le TD et la ou les borne(s)
                        </label>
                    </div>

                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
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
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
                        value={type_e}
                        onChange={(e) => setType_e(e.target.value)}
                    >
                        <option value="" disabled>Besoin prise type E</option>
                        <option value="Oui">Oui</option>
                        <option value="Non">Non</option>
                    </select>
                    <select
                        className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5"
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

                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer' 
                            value={power_charging}
                            placeholder='' 
                            onChange={(e) => setPower_charging(e.target.value)}
                        />
                        <label htmlFor="distance" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Puissance de charge souhaiter
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer' 
                            value={charge_points}
                            placeholder='' 
                            onChange={(e) => setCharge_points(e.target.value)}
                        />
                        <label htmlFor="distance" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres de points de recharges souhaiter
                        </label>
                    </div>
                    <div className='relative z-0 w-full mb-6 mt-4 group'>
                        <input 
                            type="text"
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-green-600 focus:outline-none focus:ring-0 focus:border-green-600 peer' 
                            value={box_nb}
                            placeholder='' 
                            onChange={(e) => setBox_nb(e.target.value)}
                        />
                        <label htmlFor="distance" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombres de bornes de recharges souhaiter
                        </label>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg">
                        <input
                            className='m-5'
                            name="image"
                            id="image"
                            type="file"
                            accept="image/*"
                            capture="user"
                            multiple
                            onChange={handleFileSave}
                        />
                    </div>
                    <div className="image-container grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pictures.map((picture, i) => (
                            <div key={i} className="image-item relative">
                                <img className='img w-full mt-4 rounded-sm' src={URL.createObjectURL(picture)} alt={`Photo ${i}`} />
                                <div className="button-container absolute top-0 right-0 p-2">
                                    <button type="button" className="delete-button w-8 mt-4" onClick={() => handleDeletePicture(i)}>
                                    <img src={trashImg} alt="" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-4 text-center'>
                <button className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-4 mb-4 px-4 py-2 rounded transition-all duration-300" type="submit">Soumettre</button>
                </div>
            </form>          
        </div>               
    );
}