import React from 'react'
import { CircularProgress } from '@mui/material';
import './App.css';

function LoadingScreen(){ 
return( 
    <div className='App-LoadingScreen'> 
    <CircularProgress size={75} />
  </div>  
);
}
export default LoadingScreen; 