import React from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../Atom'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

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
        <Link onClick={handleLogout}>
            <li style={{ "--i": 0, "--clr": "#ff0000" }}><p ><span><i className="fa-solid fa-right-from-bracket"></i></span>Déconnexion</p></li>
        </Link>
    )
}