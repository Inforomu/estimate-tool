import React from 'react';
import Logout from '../components/Logout';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className='flex flex-col'>
        <h2 className='mb-3 text-2xl font-semibold'>Accueil</h2>
        <Link to="/formdevis" className="text-white bg-green-700 my-2 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >Créer un Devis</Link>
        <Logout/>
    </section>

  )
}
