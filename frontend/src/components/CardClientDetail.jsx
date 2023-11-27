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

  const keysToShow = Object.keys(client).filter((key) => key !== "author_id");
  const replacedKeys = keysToShow.map((key) =>
    key === "user_email" ? "Créé par" : key
  );

  return (
    <>
      <div className="overflow-x-auto md:mx-10">
        <table className="w-full text-sm text-left rtl:text-right rounded shadow bg-green-600">
          <tbody>
            {replacedKeys.map((key, index) => (
              <tr
                key={key}
                className={`font-varela-scss bg-white border-b-4 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:border-green-500 hover:text-black transition ease-in-out duration-300`}
              >
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 text-gray-900 whitespace-nowrap text-right"
                >
                  {key === "created_at" ? "Crée le" : key}
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
