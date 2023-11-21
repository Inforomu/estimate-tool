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
                Cookies.set('role', loginData.role);
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
        <section className='w-full h-screen ml-10 mr-10 sm:ml-20 sm:mr-20 md:ml-36 md:mr-36 lg:ml-96 lg:mr-96'>
            <div>
                <h2 className='title-signin text-4xl bg-white w-full py-5 shadow-2xl rounded-lg text-center font-semibold mt-20'>Bienvenue sur estimate tool !</h2>
            </div>
            <div>
                <h2 className='title-signin text-2xl text-center font-semibold mt-20'>Connectez-vous ici !</h2>
            </div>
            {error && (
                <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className='bg-opacity-25 bg-white p-5 rounded-md shadow-2xl mt-10'>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-md font-medium text-green-500 underline">Email :</label>
                    <input
                        type="email"
                        id="email"
                        className="text-gray-900 text-md rounded-lg block w-full p-2.5 shadow-2xl bg-white focus:outline-none"
                        placeholder="Ex: exemple@inforomu.com"
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
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-green-500 underline">Mot de Passe :</label>
                    <input
                        type="password"
                        id="password"
                        className="text-gray-900 text-md rounded-lg block w-full focus:outline-none p-2.5 shadow-2xl bg-white"
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
                <div className='flex w-full justify-center'>
                    <button
                        type="submit"
                        className="text-green-500 bg-white hover:bg-green-600 hover:text-white focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto shadow-2xl px-5 py-2.5 text-center transition-all duration-300"
                    >
                    Connexion
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Signin