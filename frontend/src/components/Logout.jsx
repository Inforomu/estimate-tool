import React from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../Atom'
import Cookies from 'js-cookie';

export default function Logout(props) {
    const [, setUserState] = useAtom(userAtom)

    const handleLogout = () => {
        setUserState({ isLogged: false });
        Cookies.remove('token');
        Cookies.remove('id');
        Cookies.remove('email');
        console.log('vous etes déconnecter');
    };


    return (
        <a
            onClick={handleLogout}
            href="/"
            className=" bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
            Déconnexion
        </a>
    )
}