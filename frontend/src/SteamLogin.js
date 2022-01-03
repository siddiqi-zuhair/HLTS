import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";
import Card from '@mui/material/Card';
import { AlertTitle, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

function SteamLogin() {
    var steamURL = React.useRef(null);
    const url = 'http://99.228.118.110:9000/hlts';
    var axios = Axios;
    var totalPlayTime = 0; 
    var totalTimeToBeat=0; 
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
       console.log(JSON.stringify(apiReq))
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
      if(bool === 0){
    return (
     <React.Fragment>
        <Snackbar open={open ? true : false} autoHideDuration={6000} onClose={handleClose} in={open}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          <AlertTitle>URL error</AlertTitle>
          You have typed an invalid URL 
          </Alert> 
        </Snackbar>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', height:'100vh', backgroundColor:'#85DCBA',}}>
    
              <TextField label='Steam Account ID' placeholder="http://steamcommunity.com/id/Chujji" variant='standard' size='medium' style={{ width:430, border: 0,outline:'none',boxShadow: 'none',}} autoComplete='off' inputRef={steamURL} />
              <Button variant="outlined" size='medium' style={{borderRadius:100, height:55 }} onClick={handleSubmit}>CALCULATE</Button>
      </div>  
      </React.Fragment>
    );
  }else if (bool === 1){
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll',height:'100vh', backgroundColor:'#85DCBA' }}> 
        <img src='https://i.imgur.com/muRT0BS.gif' style={{width:100,height:100}}></img>
    </div>  
    ); 
  }else if(bool===2){
    var gameCards = [];
    for(let i=0;i<apiReq.length;i++){
      totalPlayTime+=apiReq[i].playTime
      totalTimeToBeat+=apiReq[i].howLong 
      gameCards.push( 
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
      <Card style={{backgroundColor:'#424242'}}>
        <CardContent>
          <Typography style={{textAlign:'center', color:'white'}}>
              {apiReq[i].name}
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
      <React.Fragment>
         <Snackbar autoHideDuration={6000} onClose={handleClose} open={true} anchorOrigin={{horizontal:'left', vertical:'top'}} severity='info'>
        <Alert onClose={handleClose} sx={{ width: '100%' }} severity='info'  >
          You've played {totalPlayTime} hours of games!  
          To beat all your games it would take {totalTimeToBeat} hours! 
          </Alert> 
        </Snackbar>
      <div style={{display: 'block',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', backgroundColor:'#85DCBA'}}>
       
       {gameCards}; 
       </div> 
       </React.Fragment>

    )
  
}
}
  export default SteamLogin; 
