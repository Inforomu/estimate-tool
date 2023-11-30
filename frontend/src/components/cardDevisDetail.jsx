import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import showClientDevis from '../pages/showClientDevis';
import ModifyEdit from '../assets/modify.png';
import CancelEdit from '../assets/annuler.png';
import ClosePopUpPng from '../assets/close.png';

export default function cardDevisDetail({ devis, returnPath }) {

    const [popUp, setPopUp] = useState(false);
    const [imgUrls, setImgUrls] = useState([]);
    const [editData, setEditData] = useState({
		power_contract: false,
	});
	const [power_contract, setPowerContract] = useState(devis.power_contract);
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
          console.log(data.images[0]);
          setImgUrls(data.images[0]);
        })
        .catch((error) => {
          console.log('Ca plante api cdd');
        });
    }, [devisId]);

	// Fetch sauvegarde des donnees modifier en BDD
	const handleModifyDevis = async () => {
		if(editData) {
		const apiUrl = import.meta.env.VITE_API_BASE_URL;

		const updatedDataDevis = {
			id: devisId,
			power_contract: power_contract,
		}
		
		try {
			const requestOptions = {
				method: 'PUT',
				headers: {
					'Content-type': 'applications/json',
				},
				body: JSON.stringify(updatedDataDevis)
			}

			const response = await fetch(`${apiUrl}/api/uploadformdevis/${devisId}`, requestOptions);
			if(response.ok) {
					console.log('modification du devis ok')
			} else {
					console.log('Modification devis failed')
			}
		} catch(error) {
			console.log('Erreur lors de la modification du devis')
		}
		}
		setEditData(false);
	};

	// Handle passage mode edition dans un input
	const handleEdit = () => {
		setEditData((prevEditData) => ({
		  ...prevEditData,
		  power_contract: true,
		}));
	};

	// Handle faisant appel a la fonction creer pour save les donnees modifier du devis en BDD
	const handleSave = () => {
		if(editData.power_contract) {
			handleModifyDevis();
		}
		setEditData((prevEditData) => ({
			...prevEditData,
			power_contract: false,
		}));

	}

	// Handle pour cancel le mode edit
	const handleCancel = () => {
		setEditData((prevEditData) => ({
		  ...prevEditData,
		  power_contract: false,
		}));
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
                <h2 className='paragraph-card-devis text-center text-xl text-green-500'>Details du relever terrain pour :</h2>
            </div>
            	<div className=' p-6 paragraph-card-devis'>
                	<p className='bg-white shadow-lg p-2 m-1'>
                  		<span className='underline'>Puissance souscrite:</span>
                  		{editData.power_contract ? (
                    		<input
                      			type="text"
                      			value={power_contract}
                      			onChange={(e) => setPowerContract(e.target.value)}
                    		/>
                  		) : (
                    		<span className='ml-1 text-green-500 font-bold'>{devis.power_contract}</span>
                  		)}
                  		<button className='' onClick={editData.power_contract ? handleSave : handleEdit}>
						<img src={ModifyEdit} className='w-7 ml-10' alt="" />
						</button>
						{editData.power_contract && (
    					<button className='' onClick={handleCancel}>
      						<img src={CancelEdit} className='w-7 ml-10' alt=""/>
    					</button>
  						)}
                  </p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Puissance souscrite (tarif jaune ou vert):</span> <span className='ml-1 text-green-500 font-bold'>{devis.power_yg}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Contrat:</span> <span className='ml-1 text-green-500 font-bold'>{devis.contract}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Compteur electronique:</span> <span className='ml-1 text-green-500 font-bold'>{devis.electric_controller}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Connexion telereport:</span> <span className='ml-1 text-green-500 font-bold'>{devis.telereport}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Couverture Wifi:</span> <span className='ml-1 text-green-500 font-bold'>{devis.wifi}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Couverture Mobile:</span> <span className='ml-1 text-green-500 font-bold'>{devis.mobile}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Systeme de resistance a la terre:</span> <span className='ml-1 text-green-500 font-bold'>{devis.ground_res}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Systeme de neutre:</span> <span className='ml-1 text-green-500 font-bold'>{devis.neutral_system}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Calibre disjoncteur generale:</span> <span className='ml-1 text-green-500 font-bold'>{devis.breaker}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Distance entre le TD et la ou les bornes:</span> <span className='ml-1 text-green-500 font-bold'>{devis.distance}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Type de securite de charge:</span> <span className='ml-1 text-green-500 font-bold'>{devis.secure}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Besoin d'une prise type E:</span> <span className='ml-1 text-green-500 font-bold'>{devis.type_e}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Disponibilite TD:</span> <span className='ml-1 text-green-500 font-bold'>{devis.dispo_td}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Puissance de charge souhaiter:</span> <span className='ml-1 text-green-500 font-bold'>{devis.power_charging}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Nombres de points de charges:</span> <span className='ml-1 text-green-500 font-bold'>{devis.charge_points}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Nombres de bornes:</span> <span className='ml-1 text-green-500 font-bold'>{devis.box_nb}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Observations pour ce client:</span> <span className='ml-1 text-green-500 font-bold'>{devis.observation}</span></p>
                                    
                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Relever terrain effectuer par:</span> <span className='ml-1 text-green-500 font-bold'>{devis.user_email}</span></p>

                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Numero de devis:</span> <span className='ml-1 text-green-500 font-bold'>{devis.id}</span></p>
                    
                    <p className='bg-white shadow-lg p-2 m-1'><span className='underline'>Email du client concerner:</span> <span className='ml-1 text-green-500 font-bold'>{devis.client_email}</span></p>
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
                        {imgUrls.length > 0 && (
                            <div className="popup-content">
							<span className='popup-close w-20' onClick={onClosePopUp}>
								<img src={ClosePopUpPng} alt="" />
							</span>
                              {imgUrls.map((image, index) => (
                                <img
									className="popup-image"
                                	key={index}
                                  	src={`https://imagesestimate.s3.eu-north-1.amazonaws.com/${image.image_data}`}
                                  	alt={`Image ${index}`}
                                />
                              ))}
                            </div>
                        )}
                    </div>
                </div>
        </div>
	);
}