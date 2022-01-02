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
  <SteamLogin /> 
  );
}
}
export default App;
