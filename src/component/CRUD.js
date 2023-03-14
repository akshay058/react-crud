import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Table from "./Table";
import { toast } from "react-toastify"; // import for Toast notification
import "react-toastify/dist/ReactToastify.css";

export default function CRUD() {
  // creating state to handle form data
  const [formData, setFormData] = useState({
    userId: "",
    id: "",
    title: "",
  });

  const [data, setData] = useState([]); // To manage data which we get from Get Call from JSON Server
  const [editID, setEditID] = useState(); // Mainly used to manage update and delete request
  const [refresh, setRefresh] = useState(0); // to call useEffect when needed

  //function to handle change on input in forms
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFormData(e.target.value);
    console.log(formData);
  };

  // destructuring so data is undefined error not come in handleSubmit
  const { userId, id, title } = formData;

  //handle Submit during form submittion
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId && id && title) {
      axios
        .post("https://jsonplaceholder.typicode.com/albums", formData)
        .then((res) => {
          setData([...data, res.data]);
          setFormData({ userId: "", id: "", title: "" });
          // console.log("post");
          toast.success("Album Added at JSON Server.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000, // hide toast after 3 seconds
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Add all details");
    }
  };

  //handle update using PUT call to JSON Server........
  const handleUpdate = (e) => {
    // e.preventDefault(handleSubmit);
    if (userId && id && title) {
      axios
        .put(`https://jsonplaceholder.typicode.com/albums/${editID}`, formData)
        .then((res) => {
          setFormData({ userId: "", id: "", title: "" });
          setRefresh(refresh + 1);
          console.log("put call");
          // for notification...
          toast.success("Album Updated at JSON Server .", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000, // hide toast after 3 seconds
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Add all details");
    }
  };

  //Edit data....taking editID which is index from handleEdit call for edit button
  const handleEdit = (editIDNotState) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${editIDNotState}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.log(err));
    // console.log(editID);
    // const itemToEdit = data[editID];
    // setFormData(itemToEdit);
    // handleDelete(editID);
  };

  //delete data by DELETE Call on JSON Server.......
  const handleDelete = (deleteID) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/albums/${deleteID + 1}`)
      .then((res) => {
        // console.log("deleted::::", res.data);
      });
    const newData = data.filter((item, i) => i !== deleteID);
    setData(newData);
    toast.success("Album Deleted From JSON Server.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000, // hide toast after 3 seconds
    });
  };

  // Fetch API for POST request from JSON Server
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((res) => setData(res.data))
      .catch((err) => console.log("error::", err));
  }, [refresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 mt-2">
          <h3 className="mt-4">
            {" "}
            CRUD Functionality in React using JSON Server Calls
          </h3>

          {/* Rendering Form component */}
          <Form
            handleSubmit={handleSubmit}
            userId={userId}
            handleChange={handleChange}
            id={id}
            title={title}
            handleUpdate={handleUpdate}
          />
          <hr></hr>

          {/* Rendering Table component */}

          <Table
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={data}
            setEditID={setEditID}
          />
        </div>
      </div>
    </div>
  );
}
