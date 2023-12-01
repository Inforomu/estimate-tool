import React, { useState, useEffect } from 'react';
import Logout from '../components/Logout';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Home() {

  const [menuDevis, setMenuDevis] = useState(false);
  const [menuClients, setMenuClients] = useState(false);
  const [menuAdmin, setMenuAdmin] = useState(false);
  const [email, setEmail] = useState(null);


  const activeClass = 'active';

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
  useEffect(() => {
    const emailFromCookie = Cookies.get('email');
    if (emailFromCookie) {
      setEmail(emailFromCookie);
    }
  }, []);

  return (
    <section className='flex flex-col menu'>
      <div className='welcome'>
        {email && <h2 className='text-center text-xl md:text-2xl'>Bonjours  {email}</h2>}
      </div>
      <div className='flex'>
      <ul className='ml-10'>
        <li className={menuClients ? activeClass : ''} onClick={handleMenuClients} style={{ "--i": 3, "--clr": "#08b811" }}><p><span><i className="fa-solid fa-user"></i></span>Client</p></li>
        <li className={menuDevis? activeClass : ''} onClick={handleMenuDevis} style={{ "--i": 2, "--clr": "#25d366" }}><p><span><i className="fa-solid fa-folder"></i></span>Devis</p></li>
        {Cookies.get('role') === 'admin' && (
          <li className={menuAdmin ? activeClass : ''} onClick={handleMenuAdmin} style={{ "--i": 1, "--clr": "#c32aa3" }}><p><span><i className="fa-solid fa-screwdriver-wrench"></i></span>Admin</p></li>
        )}

        <Logout />
      </ul>
      {menuClients && (
        <ul className='ml-10 xs:ml-20'>
          <Link to={"/formclient"}>
            <li style={{ "--i": 3, "--clr": "#08b811" }}><p><span><i className="fa-solid fa-plus"></i></span>Créer Client</p></li>
          </Link>
          <Link to={"/clients"}>
            <li style={{ "--i": 2, "--clr": "#25d366" }}><p><span><i className="fa-solid fa-table-list"></i></span>Voir Clients</p></li>
          </Link>
        </ul>
      )}
      {menuDevis && (
        <ul className='ml-10 xs:ml-20'>
          <Link to={"/devis"}>
            <li style={{ "--i": 2, "--clr": "#25d366" }}><p><span><i className="fa-solid fa-table-list"></i></span>Voir Devis</p></li>
          </Link>
        </ul>
      )}
      {Cookies.get('role') === 'admin' && menuAdmin && (
        <ul className='ml-10 xs:ml-20'>
          <Link to={"/signup"}>
            <li style={{ "--i": 3, "--clr": "#08b811" }}><p><span><i className="fa-solid fa-plus"></i></span>Créer Utilisateur</p></li>
          </Link>
          <Link to={"/clients"}>
            <li style={{ "--i": 2, "--clr": "#25d366" }}><p><span><i className="fa-solid fa-table-list"></i></span>Voir Clients</p></li>
          </Link>
        </ul>
      )}
      </div>
    </section>

  )
}
