/*Luu Tan Phong - 104170839
  Pham Duc Thinh - 104169675
  Nguyen Tai Minh Huy - 104220352*/
  
  import '../css/ItemTab.css';
  import { useState } from 'react';
  import Button from '@mui/material/Button';
  import UpIcon from '@mui/icons-material/ArrowDropUp';
  import DownIcon from '@mui/icons-material/ArrowDropDown';
  
  // ItemTab component receives props and renders a tab with information
  function ItemTab({ name, price, date, transID, tokenID }) {
      // State to handle showing/hiding additional information
      const [more, setMore] = useState(false);
  
      return (
          <div className='tab-container'>
              {/* Header section with basic information */}
              <div className='d-flex justify-content-center flex-row'>
                  <p className='mx-2'><strong>Name:</strong> {name}</p>
                  <p className='mx-2'><strong>Price:</strong> {price} ETH</p>
                  <p className='mx-2'><strong>Date:</strong> {date}</p>
                  {/* Button to toggle showing/hiding additional information */}
                  <Button onClick={() => setMore(!more)}>
                      {more ? (<DownIcon />) : (<UpIcon />)}
                  </Button>
              </div>
  
              {/* Additional information section (shown when 'more' is true) */}
              {more && (
                  <div className='show-container'>
                      <p><strong>Transaction ID:</strong> {transID}</p>
                      <p><strong>Token ID:</strong> {tokenID}</p>
                  </div>
              )}
          </div>
      );
  }
  
  export default ItemTab;