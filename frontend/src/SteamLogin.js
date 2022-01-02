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
      <div style={{overflow:'hidden'}}>
                  <TextField label=''placeholder="http://steamcommunity.com/id/Chujji" variant='outlined' size='medium' autoFocus style={{width:500, backgroundColor:'white',borderRadius:25}} inputRef={steamURL} />
              <Button variant="contained" size='medium' buttonStyle={{ borderRadius: 15 }} style={{borderRadius:'100'}} onClick={handleSubmit}>Enter</Button>
      </div>  
    
    );
  }else if (bool === 1){
    return (
      <div>
        <img src='https://i.imgur.com/muRT0BS.gif' style={{width:100,height:100}}></img>
    </div>  
    ); 
  }else if(bool===2){
    return(
      <div> 
        <Card>
          <CardContent>
            <Typography>
                Game Name: {apiReq[0].name}
                <br/>
                Your playtime: {apiReq[0].playTime} hours 
                <br/>
                How long to beat: {apiReq[0].howLong} hours
                <br/>
            </Typography>
                <img src={JSON.stringify(apiReq[0].image).substring(1,JSON.stringify(apiReq[0].image).length-1)}style={{width:300, height:450}}></img>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
                Game Name: {apiReq[1].name}
                <br/>
                Your playtime: {apiReq[1].playTime} hours 
                <br/>
                How long to beat: {apiReq[1].howLong} hours
                <br/>
            </Typography>
                <img src={JSON.stringify(apiReq[1].image).substring(1,JSON.stringify(apiReq[1].image).length-1)}style={{width:300, height:450}}></img>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
                Game Name: {apiReq[2].name}
                <br/>
                Your playtime: {apiReq[2].playTime} hours 
                <br/>
                How long to beat: {apiReq[2].howLong} hours
                <br/>
            </Typography>
                <img src={JSON.stringify(apiReq[2].image).substring(1,JSON.stringify(apiReq[2].image).length-1)}style={{width:300, height:450}}></img>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
                Game Name: {apiReq[3].name}
                <br/>
                Your playtime: {apiReq[3].playTime} hours 
                <br/>
                How long to beat: {apiReq[3].howLong} hours
                <br/>
            </Typography>
                <img src={JSON.stringify(apiReq[3].image).substring(1,JSON.stringify(apiReq[3].image).length-1)}style={{width:300, height:450}}></img>
          </CardContent>
        </Card>
      </div>
    )
  }
}
  export default SteamLogin; 
