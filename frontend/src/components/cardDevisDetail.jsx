import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import ModifyEdit from '../assets/modify.png';
import CancelEdit from '../assets/annuler.png';
import ClosePopUpPng from '../assets/close.png';

export default function cardDevisDetail({ devis, returnPath }) {

	const [denominations, setDenominations] = useState(null)
	const [tmpDenominations, setTmpDenominations] = useState(null)
    const [popUp, setPopUp] = useState(false);
    const [imgUrls, setImgUrls] = useState([]);
    const [editData, setEditData] = useState(null);
    const devisId = devis.id;

	// Fetch affichage des elements du devis
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        fetch(`${apiUrl}/api/uploadimg/getImagesForDevis/${devisId}`, {
            method: 'GET',
        })
        .then((response) => {
          if (!response.ok) {
            console.log('Ca plante devis detail');
          }
          return response.json();
        })
        .then((data) => {
          setImgUrls(data.images[0]);
        })
        .catch((error) => {
          console.log('Ca plante api cdd');
        });
    }, [devisId]);

	// Use effect qui recupere les donnees de devis et les stocks dans un object JSON
	useEffect(() => {
		if (devis){
			setDenominations(
				[
					{"title":"Puissance souscrite(Tarif bleu):", "header":'power_contract', "data":devis.power_contract},
					{"title":"Puissance souscrite(Tarif jaune ou vert):", "header":'power_yg', "data":devis.power_yg},
					{"title":"Contrat:", "header":'contract', "data":devis.contract},
					{"title":"Compteur electronique:", "header":'electric_controller', "data":devis.electric_controller},
					{"title":"Connexion telereport:", "header":'telereport', "data":devis.telereport},
					{"title":"Couverture Wifi:", "header":'wifi', "data":devis.wifi},
					{"title":"Couverture Mobile:", "header":'mobile', "data":devis.mobile},
					{"title":"Systeme de resistance à la terre:", "header":'ground_res', "data":devis.ground_res},
					{"title":"Systeme de neutre:", "header":'neutral_system', "data":devis.neutral_system},
					{"title":"Calibre disjoncteur générale:", "header":'breaker', "data":devis.breaker},
					{"title":"Distance entre le TD et la ou les bornes:", "header":'distance', "data":devis.distance},
					{"title":"Type de securite de charge:", "header":'secure', "data":devis.secure},
					{"title":"Besoin d'une prise type E:", "header":'type_e', "data":devis.type_e},
					{"title":"Disponibilité TD:", "header":'dispo_td', "data":devis.dispo_td},
					{"title":"Puissance de charge souhaitée:", "header":'power_charging', "data":devis.power_charging},
					{"title":"Nombres de points de charges:", "header":'charge_points', "data":devis.charge_points},
					{"title":"Nombres de bornes:", "header":'box_nb', "data":devis.box_nb},
					{"title":"Observations pour ce client:", "header":'observation', "data":devis.observation},
					{"title":"Numero du devis:", "header":'id', "data": devisId},
				]
			)
			const states = new Array(Object.keys(devis).length).fill(false) // Rempli les elements du tab avec False
			setEditData(states);
		}
	}, [devis])

	// Use effect setDenomination
	useEffect(() => {
		if (denominations) {
			setTmpDenominations(denominations);
		}

	}, [denominations])

	// Fetch sauvegarde des donnees modifier en BDD
	const handleModifyDevis = async (data) => {
		const apiUrl = import.meta.env.VITE_API_BASE_URL;
		const token = Cookies.get('token');
		// console.log(data);

		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify(data)
			}
			console.log(data)

			const response = await fetch(`${apiUrl}/api/uploadformdevis/${devisId}`, requestOptions);
			if(response.ok) {
					console.log('modification du devis ok')
			} else {
					console.log('Modification devis failed')
			}
		} catch(error) {
			console.log('Erreur lors de la modification du devis')
		}
	};

	// Handle passage mode edition dans un input, edite un input en fonction de l'index
	const handleEdit = (index) => {
		setEditData((prevEditData) => {
		  const tmp = [...prevEditData]
		  tmp[index] = true
		  return tmp
		});
	};

	// Handle changements des donnees tmpDenomition avec la value passer en param.
	const handleChangeData = (index, e) => {
		setTmpDenominations((prev) => {
			const tmp = [...prev]
			tmp[index].data = e.value
			return tmp
		});
	}

	// Handle faisant appel a la fonction creer pour save les donnees modifier du devis en BDD
	const handleSave = (index) => {
		setDenominations(tmpDenominations)
		const data = {
			id: devisId,
			[tmpDenominations[index]['header']]: tmpDenominations[index]['data'],
		}
		handleModifyDevis(data);
		console.log(data)
		setEditData((prevEditData) => {
			const tmp = [...prevEditData]
			tmp[index] = false
			return tmp
		});
	}

	// Handle pour cancel le mode edit
	const handleCancel = (index) => {
		setEditData((prevEditData) => {
			const tmp = [...prevEditData]
			tmp[index] = false
			return tmp
		});
	};

	// Handle pop-up pour les images
  	const handlePopUp = () => {
  		setPopUp(!popUp);
  	};

	const onClosePopUp = () => {
		setPopUp(!popUp);
	}

    return (
        <div className='h-full w-full'>
            <div>
                <h2 className='paragraph-card-devis text-center text-xl text-green-500'>Details du relever terrain pour : {devis.client_email}</h2>
            </div>
            	<div className='p-6 paragraph-card-devis'>
					{denominations && denominations.map((data_devis, index)=>{
						return (
							<div className=''>
							<p className='bg-white shadow-lg p-2 m-1 w-full flex items-center'>
								<span className='underline'>{data_devis.title}</span> 
								<span className='ml-1 text-green-600 font-bold'>
								{editData[index] === false && data_devis.data}
								{editData[index] === true && (
								<input
									type="text"
									className='focus:outline-green-600'
									onChange={(e) => handleChangeData(index, e.target)}
								/>
								)}
								</span>
        							<button className='ml-auto' onClick={() => editData[index] === true ? handleSave(index) : handleEdit(index)}>
            							<img src={ModifyEdit} className='flex-auto w-7' alt="" />
        							</button>
        							{editData[index] === true && (
            							<>
                							<button className='ml-2' onClick={() => handleCancel(index)}>
                    							<img src={CancelEdit} className='w-7' alt="" />
                							</button>
           								</>
        							)}
    						</p>
							</div>
						)
					})}
                    <div className='flex justify-between mt-2'>
                        <Link
                        to={returnPath}
                        className="bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 m-1 px-4 py-2  rounded transition-all duration-300"
                        > 
                            Page precedente
                        </Link>

                        <button 
                        type="button"
                        className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-2 m-1 rounded transition-all duration-300" 
                        onClick={handlePopUp}
                        >
                            Voir les photos
                        </button>
                    </div>
                    <div className={`popup ${popUp ? 'visible' : 'hidden'}`}>
                        {imgUrls.length > 0 ? (
                            <div className="popup-content">
							<span className='popup-close w-20' onClick={onClosePopUp}>
								<img src={ClosePopUpPng} alt="" />
							</span>
                              {imgUrls.map((image, index) => (
                                console.log(image.image_data),
                                <img
									className="popup-image"
                                	key={index}
                                  	src={`https://imagesestimate.s3.eu-north-1.amazonaws.com/${image.image_data}`}
                                  	alt={`Image ${index}`}
                                />
                              ))}
                            </div>
							) : (
								<div className="popup-content">
									<span className='popup-close w-20' onClick={onClosePopUp}>
										<img src={ClosePopUpPng} alt="" srcSet="" />
									</span>
									<div className='bg-white text-2xl'>
										<p className='py-6 ml-4 mr-4'>Aucune photo a afficher pour ce devis.</p>
									</div>
								</div>
							)}
                    </div>
                </div>
        </div>
	);
}