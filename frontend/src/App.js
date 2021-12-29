import './App.css';
import React from 'react' 
class App extends React.Component{ 
  consturctor(props){
    super(props); 
    this.state={apiResponse:""};
  }
  callAPI(){
    fetch("http://localhost:9000/hlts")
    .then(res=>res.text())
    .then(res=>this.setState({apiResponse:res}))
  }
  componentWillMount(){
    this.callAPI(); 
  }
  render(){
    return{ 
      <div className="App">
      <header className="App-header"></header>
      <p>{this.state.apiResponse}</p>
        </div> 
    }
  }
}

export default App;
