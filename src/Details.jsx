/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
import { useEffect, useState } from "react";
import "./css/Details.css";
import { BarChart } from "@mui/x-charts";
import { NavLink } from "react-router-dom";
import axios from "axios";

// Show NFTs details
function Details() {
  // State variables to manage the display of confirmation popup
  const [showPopup, setShowPopup] = useState(false);

  // State variables to store NFT details
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [owner, setOwner] = useState("");
  const [price, setPrice] = useState(0);
  const [id, setID] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch asset details from backend API when component mounts
    axios
      .get("http://127.0.0.1:8000/details")
      .then((response) => {
        const data = response.data;

        const asset = data[1]; // Assuming only one asset is retrieved
        setName(asset.name);
        setImg(asset.img);
        setPrice(asset.price);
        setID(asset.id);
        setOwner(asset.owner);
      })
      .catch((error) => {
        console.error("Error fetching asset details:", error);
      });
  }, []);

  // Function to handle successful purchase
  const success = () => {
    // Update NFT owner in the database (replace 'url' with actual API endpoint)
    const changeOwner = sessionStorage.getItem("username");
    fetch(url + "id/" + id, {
      // Use the 'url' state variable here
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: changeOwner,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update successful", data);
        // Handle success, e.g., show a success message or update your UI.
      })
      .catch((error) => {
        console.error("Error updating owner", error);
        // Handle error, e.g., show an error message.
      });
  };
  const fail = () => {
    sessionStorage.setItem("confirm", false);
  };
  // Function to toggle the display of the confirmation popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center py-5">
      <div className="detail-container d-flex justify-content-start px-5 py-5">
        <div className="detail-container-2 justify-content-center py-5">
          <div
            className="detail-img"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
        <div className="d-flex flex-column mx-5 my-5">
          <h4>NFT</h4>
          <h2>{name}</h2>
          <p>Owned by {owner}</p>
          <div className="d-flex flex-row">
            <div className="d-flex flex-column mx-3 align-items-center">
              <h6>Rank #</h6>
              <p>2</p>
            </div>
          </div>
          <div className="detail-container-3 px-3 my-3">
            <div className="detail-container-title">
              <h5>Price</h5>
            </div>
            <h2>{price} ETH</h2>
            <div className="detail-container-btn my-3" onClick={togglePopup}>
              {" "}
              Buy Now
            </div>
          </div>
          {showPopup && (
            <div className="detail-container-3 px-3 my-3">
              <div className="detail-container-title">
                <h5>Confirm</h5>
              </div>
              <h2>Are you sure</h2>
              <NavLink to="/cos30049/confirm">
                <div className="detail-container-btn my-3" onClick={success}>
                  Yes
                </div>
                <div
                  className="detail-container-btn my-3 bg-light text-black"
                  onClick={fail}
                >
                  No
                </div>
              </NavLink>
            </div>
          )}
          <div className="detail-container-3 px-3">
            <div className="detail-container-title">
              <h5>Price History</h5>
            </div>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: [" ", "09/12/2023", "10/04/2024"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [0, price - 0.1, price],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
