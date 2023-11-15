export default function CardClientDetail({ client }) {

  return (
    <>
      <h3 className="text-2xl font-semibold -mx-3 text-center">Fiche Client # {client.id}</h3>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Nom du client :</span> {client.nom}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Prenom du client :</span> {client.prenom}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Email :</span> {client.email}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Téléphone :</span> {client.telephone}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Ville :</span> {client.ville}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Code postal :</span> {client.zipcode}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Adresse :</span> {client.adresse}
      </p>
      <p className='py-2 my-1 border bg-slate-50 rounded shadow pl-2'>
        <span className="font-bold">Description :</span> {client.description}
      </p>
    </>
  )
}
