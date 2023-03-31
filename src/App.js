import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
// import AlertState, { Context } from "./context/notes/AlertState";

function App() {
  // const alert = Context(); // since alert is defined as null in the context we cannot destruct it using {} as object property cannot be null
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        {/* <AlertState> */}
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="*"
                element={<h1>404 Error : Page Not Found</h1>}
              />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
        {/* </AlertState> */}
      </NoteState>
    </>
  );
}

export default App;
