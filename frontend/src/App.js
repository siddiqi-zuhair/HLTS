import { fontFamily, fontWeight } from '@mui/system';
import React from 'react';
import './App.css';
import SteamLogin from './SteamLogin.js'

class App extends React.Component { 
 constructor(props){ 
  super(props) 
    this.state={apiResponse:""}; 
  this.steamURL = ''; 
  this.steam = ''; 
}
render(){ 
  return (
    <div  style={{
      display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', fontFamily:'Roboto', fontWeight:'bold', backgroundColor:'#89CFF0', backgroundRepeat:true, backgroundSize: 'cover',

  }}>
  <SteamLogin /> 
    </div > 
  );
}
}
export default App;
