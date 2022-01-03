import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';


function SteamLogin() {
    var steamURL = React.useRef(null);
    const url = 'http://192.168.86.53:9000/hlts';
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
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll',height:'100vh', backgroundColor:'#00695C' }}> 
        <img src='https://i.imgur.com/muRT0BS.gif' style={{width:100,height:100}}></img>
    </div>  
    ); 
  }else if(bool===2){
    var gameCards = [];
    for(let i=0;i<apiReq.length;i++){
      gameCards.push( 
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
      <Card style={{backgroundColor:'#424242'}}>
        <CardContent>
          <Typography style={{textAlign:'center', color:'white'}}>
              Name: {apiReq[i].name}
              <br/>
              Playtime: {apiReq[i].playTime} hours 
              <br/>
              HLTB Main: {apiReq[i].howLong} hours
              <br/>
              HLTB Main+Extra: {apiReq[i].howLongPlus} hours
              <br/> 
              HLTB Completionist: {apiReq[i].howLongComplete} hours
          </Typography>
              <img src={JSON.stringify(apiReq[i].image).substring(1,JSON.stringify(apiReq[i].image).length-1)}style={{width:300, height:450}}></img>
        </CardContent>
      </Card>
    
      </div>
    )
    } 
    return(
      <div style={{display: 'block',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', backgroundColor:'#00695C'}}>
       {gameCards}; 
       </div> 
    )
  
}
}
  export default SteamLogin; 
