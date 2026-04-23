/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
import "./css/NFTListing.css";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import UpIcon from "@mui/icons-material/ArrowDropUp";
import DownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
// Show a listing of NFTs
function Inventory() {
  // State variables
  const [filter, setFilter] = useState("");
  const [ascDesc, setAscDesc] = useState(false);
  const [type, setType] = useState("none");
  const [uname, setUname] = useState("");
  const [data, setData] = useState([
    // Initial NFT data
    {
      id: "1",
      name: "Yellow Bear",
      img: "/image/bear.png",
      price: "0.25",
      owner: "none",
      transID: "0x1A2B3C4D5E6F",
      tokenID: "0xF1E2D3C4B5A",
      address: "0x5F4E3D2C1A0",
    },
    {
      id: "2",
      name: "Blue Dog",
      img: "/image/blue-dog.png",
      price: "0.35",
      owner: "ducthinh",
      transID: "0x9F8E7D6C5B4A",
      tokenID: "0xA1B2C3D4E5F",
      address: "0xC1D2E3F4A5B",
    },
    {
      id: "3",
      name: "Blue Elephant",
      img: "/image/blue-elephant.png",
      price: "0.65",
      owner: "minhhuy",
      transID: "0x3E4D5C6B7A8F",
      tokenID: "0xB1A2C3D4E5F",
      address: "0x6F5E4D3C2B1",
    },
    {
      id: "4",
      name: "Cool Dog",
      img: "/image/cool-dog.png",
      price: "0.45",
      owner: "none",
      transID: "0xE3D2C1B0A9F",
      tokenID: "0x1F2E3D4C5B6",
      address: "0xA0B1C2D3E4F",
    },
    {
      id: "5",
      name: "Glasses Elephant",
      img: "/image/glasses-elephant.png",
      price: "0.75",
      owner: "none",
      transID: "0x8F7E6D5C4B3",
      tokenID: "0xF2E1D0C9B8A",
      address: "0x2F3E4D5C6B7",
    },
    {
      id: "6",
      name: "Green Dog",
      img: "/image/green-dog.png",
      price: "0.85",
      owner: "tanphong",
      transID: "0x6B7C8D9EAF1",
      tokenID: "0xCBA987654321",
      address: "0xFEDCBA987654",
    },
    {
      id: "7",
      name: "Monster",
      img: "/image/monster.png",
      price: "0.55",
      owner: "none",
      transID: "0x5A4B3C2D1E0F",
      tokenID: "0xF0E1D2C3B4A",
      address: "0x9E8F7D6C5B4",
    },
    {
      id: "8",
      name: "One eye Dog",
      img: "/image/one-eye-dog.png",
      price: "0.65",
      owner: "none",
      transID: "0xB1A2C3D4E5F6",
      tokenID: "0x4E5F6D7C8B9",
      address: "0x2A1B3C4D5E6",
    },
    {
      id: "9",
      name: "Pink Dog",
      img: "/image/pink-dog.png",
      price: "0.45",
      owner: "none",
      transID: "0xC2D3E4F5A6B",
      tokenID: "0x6B5A4C3D2E1",
      address: "0xE7F8D9A0B1C",
    },
    {
      id: "10",
      name: "Pink Penguin",
      img: "/image/pink-penguin.png",
      price: "0.55",
      owner: "none",
      transID: "0xF0E1D2C3B4A5",
      tokenID: "0x1A2B3C4D5E6",
      address: "0x6F7E8D9A0B1",
    },
    {
      id: "11",
      name: "Red Penguin",
      img: "/image/red-penguin.png",
      price: "0.75",
      owner: "none",
      transID: "0xA0B1C2D3E4F5",
      tokenID: "0x3E4F5A6B7C8",
      address: "0x9A8B7C6D5E4",
    },
    {
      id: "12",
      name: "White one eye Dog",
      img: "/image/white-one-eye-dog.png",
      price: "0.85",
      owner: "none",
      transID: "0x9E8F7D6C5B4A",
      tokenID: "0xA9876543210F",
      address: "0x0E1D2C3B4A5",
    },
  ]);

  // Effect hook to set the username from sessionStorage
  useEffect(() => {
    setUname(sessionStorage.getItem("username"));
  }, []);

  //Organised item into row of 3
  const chunkArray = (array, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };
  // Helper function to sort data alphabetically
  const alphaSort = (data, ascending) => {
    return data.slice().sort((a, b) => {
      if (ascending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };
  // Helper function to sort data by price
  const priceSort = (data, ascending) => {
    return data.slice().sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };
  // Helper function to apply sorting based on the selected type
  const allSort = (type) => {
    let dataSort = [];
    switch (type) {
      case "none":
        dataSort = data;
        break;
      case "alpha":
        dataSort = alphaSort(data, ascDesc);
        break;
      case "price":
        dataSort = priceSort(data, ascDesc);
        break;
    }
    dataSort = dataSort.filter(
      (item) => item.owner.toLowerCase() === uname.toLowerCase()
    );
    return dataSort;
  };

  // Chunk the items into groups of 3
  const chunkedItems = chunkArray(allSort(type), 3);

  // Function to handle filter input changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the data based on the filter value
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  const chunkedItems_2 = chunkArray(filteredData, 3);

  // Check if the filter has a value
  const hasValue = () => {
    return filter == "";
  };

  // JSX structure for rendering NFT inventory
  return (
    <div>
      <div className="d-flex justify-content-center flex-column">
        <div className="d-flex flex-row align-self-center mt-5">
          <TextField
            id="standard-basic"
            label="Search for NFTs"
            variant="standard"
            placeholder="Filter by name"
            className="input-container"
            style={{ width: "80%" }}
            value={filter}
            onChange={handleFilterChange}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Sort by</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={type}
              onChange={(e) => setType(e.target.value)} // Handle the change
            >
              <MenuItem value={"none"}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"alpha"}>A-Z</MenuItem>
              <MenuItem value={"price"}>Price</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setAscDesc(!ascDesc)}>
            {ascDesc ? <UpIcon /> : <DownIcon />}
          </Button>
        </div>
        {hasValue() ? (
          <div className="container d-flex justify-content-center flex-column align-items-center my-5">
            <div className="blog my-5">
              <div className="container-title">
                <h3 className="py-3">Inventory</h3>
              </div>
              {chunkedItems.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="d-flex flex-row justify-content-center my-3 py-5"
                >
                  {group.map((item, index) => (
                    <div className="item-container-3 mx-4">
                      <div
                        className="item-img"
                        style={{ backgroundImage: `url(${item.img})` }}
                      ></div>
                      <h5 className="item-title">{item.name}</h5>
                      <div className="justify-content-center">
                        <p>
                          <strong>Price</strong>
                        </p>
                        <p>{item.price}</p>
                        <p>
                          <strong>Address</strong>
                        </p>
                        <p>{item.address}</p>
                        <p>
                          <strong>Transaction ID</strong>
                        </p>
                        <p>{item.transID}</p>
                        <p>
                          <strong>Token ID</strong>
                        </p>
                        <p>{item.tokenID}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="container d-flex justify-content-center flex-column align-items-center my-5">
            <div className="blog search-blog my-5">
              <div className="container-title">
                <h3 className="py-3">
                  Search for <i>{filter}</i>
                </h3>
              </div>
              {chunkedItems_2.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="d-flex flex-row justify-content-center my-3 py-5"
                >
                  {group.map((item, index) => (
                    <div className="item-container-3 mx-4">
                      <div
                        className="item-img"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <h5 className="item-title">{item.name}</h5>
                      <div className="justify-content-center">
                        <p>
                          <strong>Price</strong>
                        </p>
                        <p>{item.price}</p>
                        <p>
                          <strong>Address</strong>
                        </p>
                        <p>{item.address}</p>
                        <p>
                          <strong>Transaction ID</strong>
                        </p>
                        <p>{item.transID}</p>
                        <p>
                          <strong>Token ID</strong>
                        </p>
                        <p>{item.tokenID}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Inventory;
