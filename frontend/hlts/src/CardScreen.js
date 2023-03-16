import React from 'react'
import Card from '@mui/material/Card';
import {  CardContent, CardMedia } from '@mui/material';
import { Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';
import './App.css';
import { Grid } from '@mui/material';

function CardScreen(props) { 
var totalPlayTime = 0; 
var totalTimeToBeat=0; 
var apiReq = props.apiReq; 
var gameCards = []; 
const [open, setOpen] = React.useState(true);
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
// apiReq.sort(function(a, b) {
//   return parseFloat(a.playTime) - parseFloat(b.playTime);
// });

for(let i=0;i<apiReq.length;i++){
  totalPlayTime+=apiReq[i].playTime
  totalTimeToBeat+=apiReq[i].howLong 
  var howLongStr = ''; 
  var extraStr = '' 
  var completeStr = ''; 
//   if(apiReq[i].howLong>0){
   howLongStr ='  Main: '+apiReq[i].howLong+' hours'
 // }if(apiReq[i].howLong>0){
   howLongStr ='  Main: '+apiReq[i].howLong+' hours'
//     }
//   if(apiReq[i].howLongPlus>0){
     extraStr ='  +Extra: '+apiReq[i].howLongPlus+' hours'
 //   }
//  if(apiReq[i].howLongPlus>0){
     completeStr = '  Complete: '+apiReq[i].howLongComplete+' hours'
  //    }
  gameCards.push( 
    <Grid  style={{ alignItems:'center', paddingTop:55, fontFamily:'Ubuntu',margin:'auto'}}>
  <Card style={{backgroundColor:'#467361', borderRadius:25, maxHeight:625, maxWidth:350, marginRight:'auto' }}>
    <CardContent style={{}}>
      <Typography style={{textAlign:'center', color:'white', maxWidth:300}} component='div' variant='title' sx={{fontSize:'2vh', fontWeight:'bold'}}>
          <strong>{apiReq[i].name}</strong>
      </Typography>
      <Typography component='div'style={{textAlign:'center', color:'white' }} variant='subtitle1'sx={{fontSize:14}} >
      Playtime: {apiReq[i].playTime} hours 
          <br/>
          {howLongStr} 
          <br/>
          {extraStr} 
          <br/> 
          {completeStr}
      </Typography>
          <CardMedia component='img' image={JSON.stringify(apiReq[i].image).substring(1,JSON.stringify(apiReq[i].image).length-1)}style={{width:300, height:450, overflow:'hidden', borderRadius:25}}/>
    </CardContent>
  </Card>

  </Grid>
)

} 
return(
  <React.Fragment key={apiReq}>
     <Snackbar onClose={handleClose} open={open} anchorOrigin={{horizontal:'left', vertical:'top'}} severity='info'>
    <Alert onClose={handleClose} sx={{ width: '100%' }} severity='info'  >
      You've played {totalPlayTime} hours or {Math.round(totalPlayTime/24)} days of games!  
      <br /> 
      To beat all your games it would take {totalTimeToBeat} hours or {Math.round(totalTimeToBeat/24)} days! 
      </Alert> 
    </Snackbar>
  <div className='SteamLogin' style={{ overflowY:'scroll',backgroundSize:'cover',display:'flex', flexDirection:'row', flexWrap:'wrap' , margin:'auto', paddingLeft:15,paddingRight:15}}>
   {gameCards}
   </div> 
   </React.Fragment>

)

}
export default CardScreen; 
