import React, { useState } from 'react';
import CardClientDetail from './cardClientDetail';

export default function cardClient({ clients, onCloseModal, onDelete }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    
    const handleOpenModal = () => {
        if (modalOpen != true) {
            setModalOpen(true);
            setCardOpen(true);
        }
        else {
            setModalOpen(false);
            setCardOpen(false);
        }

    }

    return (
        
        <div className={`bg-white w-full h-full rounded-lg shadow-lg p-4 m-2 bg-no-repeat ${cardOpen ? 'h-full' : 'h-20'}`}>
            <div className='flex justify-between items-center'>
                <div>
                    <p><span className="font-bold">Nom du client:</span> {clients.nom}</p>
                    <p><span className="font-bold">Prenom du client:</span> {clients.prenom}</p>
                </div>
                <button
                type="button"
                className="delete-button bg-white text-green-500 shadow-lg hover:bg-green-500 hover:text-white mt-2 px-4 py-2 rounded transition-all duration-300"
                onClick={handleOpenModal}
                > 
                    Voir Détails
                </button>
            </div>
    
          {modalOpen && (
            <CardClientDetail
              clients={clients}
              onDelete={onDelete}
            />
          )}
        </div>
      );
}
