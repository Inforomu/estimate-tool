import { Link } from "react-router-dom";

export default function CardClientDetail({ client }) {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(dateString).toLocaleString("fr-FR", options);
  };

  const getLabelForData = (data) => {
    const labelMappings = {
      id: 'Id du client',
      prenom: 'Prénom',
      nom: 'Nom',
      email: 'Email',
      telephone: 'Téléphone',
      ville: 'Ville',
      zipcode: 'Zip Code',
      adresse: 'Adresse',
      description: 'Description',
      created_at: 'Crée le'
    }
    return labelMappings[data] || data;
  }

  const keysToShow = Object.keys(client).filter((key) => key !== "author_id");
  const replacedKeys = keysToShow.map((key) =>
    key === "user_email" ? "Créé par" : key
  );

  return (
    <>
      <div className="overflow-x-auto md:mx-10 md:text-xl shadow-2xl rounded-lg font-varela-scss ">
        <table className="w-full text-left rtl:text-right shadow bg-green-600">
          <tbody>
            {replacedKeys.map((key, index) => (
              <tr
                key={key}
                className={`bg-white border-b-4 font-bold ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:border-green-500 hover:text-green-600 transition ease-in-out duration-300`}
              >
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 text-gray-900  whitespace-nowrap text-right"
                >
                  {getLabelForData(key)} :
                </th>
                <td className="w-3/4 px-5 py-3">
                  <span className="text-base">
                    {key === "created_at"
                      ? formatDate(client["created_at"])
                      : key === "Créé par"
                      ? client["user_email"]
                      : client[key]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
