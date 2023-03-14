import "./App.css";
import CRUD from "./component/CRUD";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      {" "}
      <CRUD />
      <ToastContainer />
    </div>
  );
}

export default App;
