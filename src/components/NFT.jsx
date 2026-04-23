/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
/* Import necessary libraries and components */
import { NavLink } from "react-router-dom";
import "../css/NFT.css"; // Import the CSS file for styling

// Function to create individual NFT template
function NFT({ id, name, img, price }) {
  // Function to store NFT data in session storage
  const storeData = () => {
    sessionStorage.setItem("item-id", id);
    sessionStorage.setItem("item-name", name);
    sessionStorage.setItem("item-img", img);
    sessionStorage.setItem("item-price", price);
  };

  // JSX structure for individual NFT
  return (
    <div className="item-container mx-4" onClick={storeData}>
      <NavLink className="nav-box" to="/cos30049/details">
        <div
          className="item-img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <h5 className="item-title my-2">{name}</h5>
        <table className="mx-2 my-3">
          <thead>
            <tr>
              <th> Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{price} ETH</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </NavLink>
    </div>
  );
}

export default NFT; // Export the NFT component