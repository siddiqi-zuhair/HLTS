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
      display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'
  }}>
  <SteamLogin /> 
    </div > 
  );
}
}
export default App;
