import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";
import { AlertTitle } from '@mui/material';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import './App.css';
import CardScreen from  './CardScreen.js'
import LoadingScreen from './LoadingScreen.js'
 
function SteamLogin() {
    var steamURL = React.useRef(null);
    const url = 'http://localhost:9000/hlts';
    var axios = Axios;
  const [open, setOpen] = React.useState(false);

  const [apiReq,setAPI] = useState("") 
  const [bool,setBool] = useState(0) 
   const handleSubmit= e =>{    
      setBool(1)
      axios.post(url, {'STEAMURL':steamURL.current.value})
       .then(response=>{ 
         if(typeof(response.data)==='object'){ 
           setAPI(response.data) 
           setBool(2) 
         }else{
           setOpen(true) 
           setBool(0) 
         }
       })
       .catch(error => {
           console.log(error)
       })
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

      if(bool === 0){
    return (
     <React.Fragment >
        <Snackbar open={open ? true : false} autoHideDuration={6000} onClose={handleClose} in={open}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>URL error</AlertTitle>
          You have typed an invalid URL 
          </Alert> 
        </Snackbar>
      <div className='SteamLogin' style={{overflow:'hidden'}}>          
              <TextField label='Steam Account URL'  variant='standard' autoComplete='off' inputRef={steamURL} />
              <Button variant="outlined" size='medium' style={{  borderRadius: 100, height:55}} onClick={handleSubmit}>CALCULATE</Button>
      </div>  
      </React.Fragment>
    );
  }else if (bool === 1){
    return (
    <LoadingScreen/>
    ); 
  
  }else if(bool===2){
    return <CardScreen  apiReq={apiReq}/> 
  }
}
  export default SteamLogin; 
