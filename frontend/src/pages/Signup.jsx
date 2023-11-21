import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
    };
    
    function resetForm() {
        setEmail('');
        setPassword('');
        setRole('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password, role };
        const apiUrl = import.meta.env.VITE_API_BASE_URL;


        try {
            console.log(userData);
            const response = await fetch(`${apiUrl}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const userDataResponse = await response.json();
                navigate('/')
                resetForm()
                console.log('Inscription Réussie :', userDataResponse);
            } else {
                console.error('Réponse non OK:', response);
                setError('Email ou mot de passe Incorrect');
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
                <h2 className='title-signup text-center font-semibold mt-20'>Inscrivez un utilisateur ici, n'oublier pas de lui definir un role !</h2>
            </div>
            {error && (
                <div className="bg-white text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
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
                    <label htmlFor="password" className="block mb-2 text-md font-medium text-green-500 underline">Mot de Passe :</label>
                    <input
                        type="password"
                        id="password"
                        className="text-gray-900 text-md rounded-lg block w-full p-2.5 shadow-2xl bg-white focus:outline-none"
                        placeholder="************"
                        name="password"
                        minLength={3}
                        maxLength={50}
                        aria-describedby="champs password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <select
                    className="mt-4 shadow-xl text-sm rounded-lg outline-none w-full p-2.5" required value={role} onChange={handleRoleChange}
                >
                    <option value="" disabled>Selectionner un Role :</option>
                    <option value="employe">Employe</option>
                    <option value="admin">Administrateur</option>
                </select>
                <button
                    type="submit"
                    className="bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-6 m-1 px-4 py-2  rounded transition-all duration-300"
                >
                    Inscription
                </button>
            </form>
        </section>
    );
}

export default Signup