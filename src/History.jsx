import "./css/History.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import ItemTab from "./components/ItemTab";
import axios from "axios"; // Import axios for making HTTP requests

function History() {
  const [transactions, setTransactions] = useState([]); // State to store transaction data
  const [filter, setFilter] = useState(""); // State to handle filter input

  useEffect(() => {
    // Fetch transaction data from backend API when component mounts
    axios
      .get("http://127.0.0.1:8000/transactions")
      .then((response) => {
        setTransactions(response.data); // Update state with fetched transaction data
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtering data based on the input filter
  const filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center my-5">
      <div className="history-container d-flex justify-content-center align-items-center flex-column">
        <div className="container-title mb-5">
          <h2>Transactions</h2>
        </div>
        <div
          className="d-flex align-items-center flex-column"
          style={{ width: "70%" }}
        >
          {/* Input field for filtering */}
          <TextField
            id="standard-basic"
            label="Search for NFTs"
            variant="standard"
            placeholder="Filter by name"
            className="input-container align-self-end my-4"
            value={filter}
            onChange={handleFilterChange}
          />
          {/* Displaying filtered transaction history */}
          <div className="d-flex history-container justify-content-center flex-column mb-4">
            {filteredTransactions.map((item, index) => (
              <ItemTab
                key={index}
                name={item.name}
                price={item.price}
                date={item.date}
                transID={item.transID}
                tokenID={item.tokenID}
                mode={item.mode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
