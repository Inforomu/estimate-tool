import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import loadingImage from '../assets/loading.png';
import CardClientDetail from '../components/CardClientDetail';


export default function showClient() {
  const { id } = useParams();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [client, setClient] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [adresse, setAdresse] = useState('');
  const [description, setDescription] = useState('');

  const [showForm, setShowForm] = useState(false);

  const handleModifyClick = () => {
    if (showForm === false) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  function resetForm() {
    setPrenom('');
    setNom('');
    setEmail('');
    setPhone('');
    setCity('');
    setZip_code('');
    setAdresse('');
    setDescription('');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(`http://localhost:3000/api/client/${id}`, requestOptions);
        if (!response.ok) {
          throw new Error("La requête a échoué");
        }

        const data = await response.json();
        console.log(data);
        setClient(data[0]);
        setLoading(false);
        setShouldFetchData(false);
      } catch (error) {
        console.error("Erreur lors de la récupération du client :", error);
        setError('Le client n\'existe pas');
        setLoading(false);
      }
    };

    fetchData();

  }, [shouldFetchData, id]);

  const handleModify = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const ClientId = client.id

      const token = Cookies.get('token');
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: ClientId,
          prenom: prenom !== '' ? prenom : client.prenom,
          nom: nom !== '' ? nom : client.nom,
          email: email !== '' ? email : client.email,
          telephone: phone !== '' ? phone : client.telephone,
          ville: city !== '' ? city : client.ville,
          zipcode: zip_code !== '' ? zip_code : client.zipcode,
          adresse: adresse !== '' ? adresse : client.adresse,
          description: description !== '' ? description : client.description,
        }),
      };

      const response = await fetch(`${apiUrl}/api/client/${ClientId}`, requestOptions);

      if (!response.ok) {
        throw new Error('Erreur lors de la modification');
      }
      setShouldFetchData(true);
      resetForm()
      console.log('Modification réussie');
    } catch (error) {
      setError('La modification a échouée');
      console.error('Erreur lors de la modification :', error);
    }
  };

  return (
    <section className='flex md:flex-row py-5 flex-col justify-center items-center h-full w-full'>
      <>
        {loading ? (
          <div className="loading-image text-center">
            <img src={loadingImage} alt="" />
          </div>
        ) : (
          error ? (
            <div className="bg-red-300 text-sm font-semibold p-1 my-1 rounded shadow" role="alert">
              {error}
            </div>
          ) : (
            <>
              <div className="bg-white border border-gray-200 rounded-lg shadow w-full sm:w-2/3 md:w-1/2 mx-5">
                <div className="p-5">
                  <CardClientDetail client={client} />
                  <button onClick={handleModifyClick} className="bg-white border text-green-500 shadow-lg hover:bg-green-500 hover:text-white px-4 py-4 rounded transition-all duration-300 m-3">
                    Modifier
                  </button>
                </div>
              </div>
              {showForm && (
                <div className='flex justify-center items-center m-5 '>
                  <form onSubmit={handleModify} className="w-full max-w-lg bg-opacity-25 bg-green-600 p-5 rounded-md shadow">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-green-900 outline-none text-xs font-bold mb-2" htmlFor="grid-first-name">
                          Prenom
                        </label>
                        <input
                          className="bg-white text-green-900 text-md rounded-lg block w-full p-2.5"
                          id="grid-first-name"
                          type="text"
                          placeholder="Prénom"
                          value={prenom}
                          onChange={(e) => setPrenom(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                          Nom
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Nom"
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                          Email
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="grid-password"
                          type="email"
                          placeholder="123abc@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telephone">
                          Telephone
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="telephone"
                          type="tel"
                          placeholder="0601020304"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-0 md:mb-6">
                      <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                          Ville
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="grid-city"
                          type="text"
                          placeholder="ex : Paris"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                          Postal
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                          value={zip_code}
                          onChange={(e) => setZip_code(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                          Adresse
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="grid-password"
                          type="text"
                          placeholder="Numéro et Rue"
                          value={adresse}
                          onChange={(e) => setAdresse(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='flex flex-wrap mb-6'>
                      <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Ajouter une Desciption</label>
                      <textarea id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ajouté si nécessaire ..."
                        maxLength={500}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      >
                      </textarea>
                    </div>
                    <button type="submit" className='bg-green-500 px-5 py-3 rounded-lg shadow font-semibold text-center hover:bg-green-600'>Modifier le client</button>
                  </form>
                </div>
              )}
            </>
          )
        )}
      </>
    </section>
  )
}