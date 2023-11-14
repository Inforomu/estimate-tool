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
import ShowClient from './pages/showClient';
import ShowDevis from './pages/showDevis';
import ShowImage from './pages/showImg';


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
    }
  }, []);

  return (
    <BrowserRouter>
    <main>
      <Routes>
        {user.isLogged ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/formdevis" element={<FormDevis />} />
            <Route path="/formclient" element={<FormClient />} />
            <Route path="/clients" element={<ShowClient />} />
            <Route path="/devis" element={<ShowDevis />} />
            <Route path="/image" element={<ShowImage />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Signin />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </BrowserRouter>
  )
}

export default App
