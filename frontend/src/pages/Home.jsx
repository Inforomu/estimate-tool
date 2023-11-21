import React, { useState } from 'react';
import Logout from '../components/Logout';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Home() {

  const [menuDevis, setMenuDevis] = useState(false);
  const [menuClients, setMenuClients] = useState(false);
  const [menuAdmin, setMenuAdmin] = useState(false);


  const handleMenuDevis = () => {
    if (menuDevis === false) {
      setMenuClients(false);
      setMenuAdmin(false);
      setMenuDevis(true);
    } else {
      setMenuDevis(false);
    }
  };
  const handleMenuClients = () => {
    if (menuClients === false) {
      setMenuDevis(false);
      setMenuAdmin(false);
      setMenuClients(true);
    } else {
      setMenuClients(false);
    }
  };
  const handleMenuAdmin = () => {
    if (menuAdmin === false) {
      setMenuClients(false);
      setMenuDevis(false);
      setMenuAdmin(true);
    } else {
      setMenuAdmin(false);
    }
  };

  return (
    <section className=''>
      <h2 className='mb-3 text-2xl font-semibold'>Accueil</h2>
      <div className='flex'>
        <div className='flex flex-col'>
          <button onClick={handleMenuClients} className=' bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Clients</button>
          <button onClick={handleMenuDevis} className=' bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Devis</button>
          {Cookies.get('role') === 'admin' && (
            <button onClick={handleMenuAdmin} className=' bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Admin</button>
          )}
          <Logout />
        </div>
        {menuDevis && (
          <div className='flex flex-col'>
            <Link to={"/formdevis"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Créer un Devis</Link>
            <Link to={"/devis"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Voir les Devis</Link>
          </div>
        )}
        {menuClients && (
          <div className='flex flex-col'> 
            <Link to={"/formclient"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Créer un Client</Link>
            <Link to={"/clients"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Voir les Clients</Link>
          </div>
        )}
        {Cookies.get('role') === 'admin' && menuAdmin && (
        <div className='flex flex-col'>
          <Link to={"/signup"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Créer un Utilisateur</Link>
          <Link to={"/clients"} className='bg-green-500 m-1 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Voir les Clients</Link>
        </div>
      )}
      </div>
    </section>
  )
}
