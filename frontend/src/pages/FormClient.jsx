import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function FormClient() {

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [adresse, setAdresse] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handlePrenomChange = (e) => {
        setPrenom(e.target.value);
    }

    const handleNomChange = (e) => {
        setNom(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleZip_codeChange = (e) => {
        setZip_code(e.target.value);
    }

    const handleAdresseChange = (e) => {
        setAdresse(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formClientData = { prenom, nom, email, phone, city, zip_code, adresse, description };
        const token = Cookies.get('token');
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            const ClientResponse = await fetch(`${apiUrl}/api/client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify(formClientData),
            });

            if (ClientResponse.ok) {
                const Data = await ClientResponse.json();
                navigate('/')
                console.log('Objet créer :', Data);
            } else {
                console.error('Échec de la création :', ClientResponse);
                setError('Échec de la création du client');
            }

        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError('Erreur de connexion au serveur. Veuillez vérifier votre connexion Internet.');
        }
    };

    return (
        <section className=' w-full flex flex-col justify-center items-center'>
            <h2 className=' text-2xl font-semibold py-5'>Créer un Client</h2>
            {error && (
                <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-opacity-25 bg-purple-500 p-5 rounded-md shadow">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Prenom
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Prénom"
                            value={prenom}
                            onChange={handlePrenomChange}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Nom
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={handleNomChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Email
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-password"
                            type="email"
                            placeholder="123abc@gmail.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telephone">
                            Telephone
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="telephone"
                            type="tel"
                            placeholder="0601020304"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-0 md:mb-6">
                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Ville
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-city"
                            type="text"
                            placeholder="ex : Paris"
                            value={city}
                            onChange={handleCityChange}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Postal
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-zip"
                            type="text"
                            placeholder="90210"
                            value={zip_code}
                            onChange={handleZip_codeChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Adresse
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="grid-password"
                            type="text"
                            placeholder="Numéro et Rue"
                            value={adresse}
                            onChange={handleAdresseChange}
                        />
                    </div>
                </div>
                <div className='flex flex-wrap mb-6'>
                    <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Ajouter une Desciption</label>
                    <textarea id="description" 
                        rows="4" 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Ajouté si nécessaire ..."
                        maxLength={500}
                        value={description}
                        onChange={handleDescriptionChange}
                        >
                    </textarea>
                </div>
                <button type="submit" className='bg-green-500 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Créer un client</button>
            </form>
        </section>
    )
}
