import React from 'react'

export default function cardClientDetail({ clients, onDelete}) {

    // const handleDeleteClients = () => {
    //     const confirmDelete = window.confirm('Voulez-vous supprimer ce client ?');
    //     if (confirmDelete) {
    //       onDelete(clients.id);
    //       onCloseModal();
    //     };
    // }
    // Ajouter btn supp avec logique back pour les admins.

  return (
    <div>
        <div className=''>
            <p><span className="font-bold">Email client:</span> {clients.email}</p>
            <p><span className="font-bold">Telephone du client:</span> {clients.phone}</p>
            <p><span className="font-bold">Code Postal:</span> {clients.zip_code}</p>
            <p><span className="font-bold">Adresse:</span> {clients.adresse}</p>
            <p><span className="font-bold">Notes pour ce client:</span> {clients.description}</p>
            <p><span className="font-bold">Client creer par:</span> {clients.user_email}</p>
        </div>
    </div>
  )
}
