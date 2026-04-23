import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/accounts/", { username, password })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setIsLoggedIn(true); // Set isLoggedIn to true
        setLoggedInUsername(username); // Save the logged-in username
        // Redirect or perform other actions as needed
      })
      .catch((error) => {
        // Handle error response
        console.error("Error:", error.response.data.detail);
        setErrorMessage("Invalid username or password");
      });
  };

  const handleLogout = () => {
    // Reset state variables to logout
    setIsLoggedIn(false);
    setLoggedInUsername("");
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <div
        className="history-container d-flex justify-content-center align-items-center flex-column"
        style={{ width: "50%" }}
      >
        <div className="container-title mb-5">
          <h2>Login</h2>
        </div>
        {isLoggedIn ? ( // Check if user is logged in
          <div>
            <p>Welcome, {loggedInUsername}!</p>{" "}
            {/* Display the logged-in username */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout} // Call handleLogout function on click
            >
              Logout
            </Button>{" "}
            {/* Logout button */}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center flex-column">
              <TextField
                id="username"
                label="Username"
                variant="standard"
                placeholder="Enter username"
                className="align-self-start"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                placeholder="Enter password"
                className="align-self-start my-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                className="my-2"
              >
                Login
              </Button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
