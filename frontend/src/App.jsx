import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { userAtom } from './Atom';
import Cookies from 'js-cookie';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import FormDevis from "./pages/FormDevis";
import FormClient from './pages/FormClient';
import Client from './pages/Client';
import Devis from './pages/Devis';
import ShowDevis from './pages/showDevis';
import ShowClient from './pages/ShowClient';
import NavLogo from './components/NavLogo';
import ShowClientDevis from './pages/showClientDevis';


function App() {
  const [user, setUser] = useAtom(userAtom);


  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setUser({
        isLogged: true,
      });
    } else {
      setUser({
        isLogged: false,
      });
      Cookies.remove('token');
      Cookies.remove('id');
      Cookies.remove('email');
      Cookies.remove('role');
    }
  }, []);

  const originalConsoleError = console.error;

  // console.error = function (message) {
  //   if (message.includes('Encountered two children')) {
  //     return;
  //   }
  //   originalConsoleError.apply(console, arguments);
  // };

  return (
    <BrowserRouter>
     {user.isLogged && <header><NavLogo /></header>}
    <main>
      <Routes>
        {user.isLogged ? (
          <>
          {Cookies.get('role') === 'admin' && (
            <Route path="/signup" element={<Signup />} />
          )}
            <Route path="/" element={<Home />} />
            <Route path="/formdevis/:id" element={<FormDevis />} />
            <Route path="/formclient" element={<FormClient />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/clients/:id" element={<ShowClient />} />
            <Route path="/clients/:id/devis" element={<ShowClientDevis />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/devis/:id" element={<ShowDevis />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
