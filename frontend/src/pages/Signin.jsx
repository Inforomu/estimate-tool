import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from '../Atom';
import Cookies from 'js-cookie';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [, setUserState] = useAtom(userAtom);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            const loginResponse = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log(loginResponse);

            if (loginResponse.ok) {
                const loginData = await loginResponse.json();
                Cookies.set('token', loginData.token);
                Cookies.set('id', loginData.userID);
                Cookies.set('email', loginData.email);
                setUserState({ isLogged: true });
                navigate('/')
                resetForm()
                console.log('Connexion réussie :', loginData);
            } else {
                console.error('Échec de la connexion :', loginResponse);
                setError('L\'adresse e-mail ou le mot de passe saisie est incorect');
                resetForm()
            }

        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError('Erreur de connexion au serveur. Veuillez vérifier votre connexion Internet.');
            resetForm()
        }
    };

    return (
        <section className=' w-80'>
            <h2 className=' text-2xl font-semibold'>Connexion</h2>
            {error && (
                <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className='bg-opacity-25 bg-purple-500 p-5 rounded-md shadow'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email :</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Votre Email"
                        name="email"
                        minLength={3}
                        maxLength={40}
                        aria-describedby="champs email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Mot de Passe :</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="********"
                        name="password"
                        minLength={3}
                        maxLength={50}
                        aria-describedby="champs password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Connexion
                </button>
            </form>
        </section>
    );
}

export default Signin