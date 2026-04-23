/*Luu Tan Phong - 104170839
    Pham Duc Thinh - 104169675
    Nguyen Tai Minh Huy - 104220352*/
import "./css/NFTListing.css";
import NFT from "./components/NFT";
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
function Items() {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [ascDesc, setAscDesc] = useState(false);
  const [type, setType] = useState("none");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/assets/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //Organised item into row of 3
  const chunkArray = (array, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArr.push(array.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  const alphaSort = (data, ascending) => {
    return data.slice().sort((a, b) => {
      if (ascending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };
  const priceSort = (data, ascending) => {
    return data.slice().sort((a, b) => {
      if (ascending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  };
  const allSort = (array, type) => {
    let dataSort = [];
    switch (type) {
      case "none":
        dataSort = array;
        break;
      case "alpha":
        dataSort = alphaSort(array, ascDesc);
        break;
      case "price":
        dataSort = priceSort(array, ascDesc);
        break;
    }
    return dataSort;
  };

  // Chunk the items into groups of 3
  const chunkedItems = chunkArray(allSort(data, type), 3);

  // Function to handle filter input changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the data based on the filter value
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  const chunkedItems_2 = chunkArray(allSort(filteredData, type), 3);
  const hasValue = () => {
    return filter == "";
  };
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
                <h3 className="py-3">All Items</h3>
              </div>
              {chunkedItems.map((group, groupIndex) => (
                <div
                  key={groupIndex}
                  className="d-flex flex-row justify-content-center my-3 py-5"
                >
                  {group.map((item, index) => (
                    <NFT
                      key={`nft_${groupIndex}_${index}`}
                      id={item.id}
                      name={item.name}
                      img={item.img}
                      price={item.price}
                    />
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
                    <NFT
                      key={`nft_${groupIndex}_${index}`}
                      name={item.name}
                      img={item.img}
                      price={item.price}
                    />
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
export default Items;
