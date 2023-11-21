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
        Cookies.remove('role');
        console.log('vous etes déconnecter');
    };


    return (
        <a
            onClick={handleLogout}
            href="/"
            className=" bg-red-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-red-600"
        >
            Déconnexion
        </a>
    )
}