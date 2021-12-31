import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";

function SteamLogin(props) {
    var steamURL = React.useRef(null);
    const url = 'http://localhost:9000/hlts';
    var axios = Axios;
const [steam, setURL] = useState("")
const [apiReq,setAPI] = useState("") 
   const handleSubmit= e =>{
   e.preventDefault() 
    setURL(steamURL.current.value) 
       axios.post(url, {'STEAMURL':steam})
       .then(response=>{ 
           setAPI(JSON.stringify(response.data)) 
       })
       .catch(error => {
           console.log(error)
       })
      
      };
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
              <label>
                  <TextField defaultValue="Steam URL" inputRef={steamURL} />

              </label>
              <Button variant="contained" onClick={handleSubmit}>Enter</Button> 
              {steam} 
              {apiReq}
      </div> 
    );
  }
  export default SteamLogin; 
