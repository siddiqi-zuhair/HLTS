import React from 'react'
import {useState} from "react";  
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  
import Axios from "axios";
import Card from '@mui/material/Card';
import { AlertTitle, CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import { CircularProgress } from '@mui/material';


function SteamLogin() {
    var steamURL = React.useRef(null);
    const url = 'http://99.228.118.110:9000/hlts';
    var axios = Axios;
    var totalPlayTime = 0; 
    var totalTimeToBeat=0; 
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);

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
    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen2(false);
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
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll', height:'100vh', backgroundColor:'#85DCBA',fontSize:'8vw'}}>
    
              <TextField label='Steam Account ID' placeholder="http://steamcommunity.com/id/Chujji" variant='standard' size='medium' style={{  border: 0,outline:'none',boxShadow: 'none',}} autoComplete='off' inputRef={steamURL} />
              <Button variant="outlined" size='medium' style={{borderRadius:100, height:55 }} onClick={handleSubmit}>CALCULATE</Button>
      </div>  
      </React.Fragment>
    );
  }else if (bool === 1){
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'scroll',height:'100vh', backgroundColor:'#85DCBA' }}> 
      <CircularProgress />
    </div>  
    ); 
  }else if(bool===2){
    var gameCards = [];
    for(let i=0;i<apiReq.length;i++){
      totalPlayTime+=apiReq[i].playTime
      totalTimeToBeat+=apiReq[i].howLong 
      var howLongStr = ''; 
      var extraStr = '' 
      var completeStr = ''; 
   //   if(apiReq[i].howLong>0){
      var howLongStr ='  Main: '+apiReq[i].howLong+' hours'
     // }if(apiReq[i].howLong>0){
      var howLongStr ='  Main: '+apiReq[i].howLong+' hours'
 //     }
   //   if(apiReq[i].howLongPlus>0){
        var extraStr ='  +Extra: '+apiReq[i].howLongPlus+' hours'
     //   }
    //  if(apiReq[i].howLongPlus>0){
          var completeStr = '  Complete: '+apiReq[i].howLongComplete+' hours'
      //    }
      gameCards.push( 
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'20px', marginTop:'20px'}}>
      <Card style={{backgroundColor:'#467361', borderRadius:25, }}>
        <CardContent style={{}}>
          <Typography style={{textAlign:'center', color:'white', maxWidth:300}} component='div' variant='title' sx={{fontSize:30}}>
              <strong>{apiReq[i].name}</strong>
          </Typography>
          <Typography component='div'style={{textAlign:'center', color:'white' }} variant='subtitle1'sx={{fontSize:15}} >
          Playtime: {apiReq[i].playTime} hours 
              <br/>
              {howLongStr} 
              <br/>
              {extraStr} 
              <br/> 
              {completeStr}
          </Typography>
              <CardMedia component='img' image={JSON.stringify(apiReq[i].image).substring(1,JSON.stringify(apiReq[i].image).length-1)}style={{width:300, height:450, overflow:'hidden'}}/>
        </CardContent>
      </Card>
    
      </div>
    )
    } 
    return(
      <React.Fragment>
         <Snackbar autoHideDuration={6000} onClose={handleClose2} open={open2} anchorOrigin={{horizontal:'left', vertical:'top'}} severity='info'>
        <Alert onClose={handleClose2} sx={{ width: '100%' }} severity='info'  >
          You've played {totalPlayTime} hours of games!  
          To beat all your games it would take {totalTimeToBeat} hours! 
          </Alert> 
        </Snackbar>
      <div style={{display: 'block',  justifyContent:'center', alignItems:'center', backgroundSize: 'cover', overflowY: 'hidden', backgroundColor:'#85DCBA'}}>
       {console.log(apiReq)}
       {gameCards}; 
       </div> 
       </React.Fragment>

    )
  
}
}
  export default SteamLogin; 
