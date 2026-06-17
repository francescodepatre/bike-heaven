/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from 'react';
import { useState } from 'react';
import { Transition } from 'react-transition-group';
import "./searchbar.css";
import Src from "./search_bar_icon.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function SearchBar() {

  const [inProp, setInProp] = useState(false);

  const handleButtonClick = () => {
    setInProp(!inProp);
  };  

  return(
    <div className="search_container">
      <Transition in={inProp} timeout={300}>
        {(state) => (
      <div className="search_bar">
      <IconButton id="delbtn" aria-label="delete" onClick={handleButtonClick}>
      <DeleteIcon />
      </IconButton>
        <TextField fullWidth id="fullWidth" label="Search for..." variant="standard" />
        <Button id="searchbutton" variant="outlined" style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white'}}>SEARCH</Button>
      </div>
      )}
      </Transition>
    </div>
  );
}
  
  export default SearchBar;