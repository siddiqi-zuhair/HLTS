import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';

function SteamLogin(props) {
    var steamURL = React.useRef(null);
    const url = 'http://localhost:9000/hlts';
    var axios = Axios;
const [apiReq,setAPI] = useState("") 
const [bool,setBool] = useState(0) 
   const handleSubmit= e =>{    
      setBool(1)
      console.log(steamURL.current.value);
      axios.post(url, {'STEAMURL':steamURL.current.value})
       .then(response=>{ 
           setAPI(response.data) 
           setBool(2) 
       })
       .catch(error => {
           console.log(error)
       })
       console.log(JSON.stringify(apiReq))
    };
      if(bool === 0 ){
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', height:'100vh', backgroundColor:'#85DCBA'}}>
              <TextField label='Steam Account ID' placeholder="http://steamcommunity.com/id/Chujji" variant='outlined' size='medium' style={{borderRadius:100, width:460, backgroundColor:'white',}} inputRef={steamURL} />
              <Button variant="contained" size='medium' style={{borderRadius:100, height:55}} onClick={handleSubmit}>Enter</Button>
      </div>  
    
    );
  }else if (bool === 1){
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll',height:'100vh', backgroundColor:'#85DCBA' }}> 
        <img src='https://i.imgur.com/muRT0BS.gif' style={{width:100,height:100}}></img>
    </div>  
    ); 
  }else if(bool===2){
    var indents = [];
    for(let i=0;i<5;i++){
      indents.push( 
      <Card>
        <CardContent>
          <Typography>
              Game Name: {apiReq[i].name}
              <br/>
              Your playtime: {apiReq[i].playTime} hours 
              <br/>
              How long to beat: {apiReq[i].howLong} hours
              <br/>
          </Typography>
              <img src={JSON.stringify(apiReq[i].image).substring(1,JSON.stringify(apiReq[i].image).length-1)}style={{width:300, height:450}}></img>
        </CardContent>
      </Card>
    )
    console.log(indents) 
    return(
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', backgroundColor:'#85DCBA'}}>
       {indents}; 
       </div> 
    )
  }
}
}
  export default SteamLogin; 
