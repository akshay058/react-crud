import React from "react";

export default function Table(props) {
  const { handleEdit, handleDelete, data, setEditID } = props;
  return (
    // created table to show data in proper format

    <div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">UserId</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
          </tr>
        </thead>
        <tbody>
            {/* mapping to all data stored in array of object */}
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handleEdit(item.id);
                    setEditID(item.id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)} // here onClick used with callback ()=>{} so it will not automatic call
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
