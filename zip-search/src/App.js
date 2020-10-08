import React, { Component } from "react";
import "./App.css";

function City(props) {
  return (
    <div className="card">
      <h3>
        {props.data.City}, {props.data.State}
      </h3>
      <ul>
        <li> Population: {props.data.EstimatedPopulation}</li>
        <li>
          Location: ({props.data.Lat}, {props.data.Long})
        </li>
      </ul>
    </div>
  );
}

function Zip(props) {
  return (
    <ul>
        <li>{props.data}</li>
    </ul>
  );
}

function ZipSearchField(props) {
  return (
    <div className="card">
    <div>
      type in a zip code:
      <span>     </span>
      <input 
        type="text"
        onChange={(e) => props.zipChanged(e)}
        value={props.value}
      />
      <p> the zip code entered is: {props.value}</p>
    </div></div>
  );
}
function CitySearchField(props) {
  return (
    <div>
      type in a city:
      <input
        type="text"
        onChange={(e) => props.cityChanged(e)}
        value={props.value}
      />
      <p> the city your entered is: {props.value}</p>
      
    </div>
  );
}

class App extends Component {
  state = {
    inputZip: "",
    inputCity: "",
    cityResults: [],
    zipResults: [],
  };
  handleZipChange(e) {
    this.setState({
      inputZip: e.target.value,
    });
    if (e.target.value.length === 5) {
      fetch("https://ctp-zip-api.herokuapp.com/zip/" + e.target.value)
        .then((res) => res.json())
        .then((jsonData) => {
          this.setState({
            cityResults: jsonData,
          });
        })
        .catch((err) => {
          this.setState({ cityResults: [] });
        });
    } else {
      this.setState({ cityResults: [] });
    }
  }

  handleCityChange(e) {
    this.setState({
      inputCity: e.target.value,
    });
    if(e.target.value.length > 1){
      fetch("https://ctp-zip-api.herokuapp.com/city/" + e.target.value.toUpperCase())
      .then((res) => res.json())
      .then((jsonData) => {
        this.setState({
          zipResults: jsonData,
        });
      })
    .catch((err) => {
      this.setState({zipResults: [] });
    });
  }else {
    this.setState({zipResults: [] });
  }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField
          zipChanged={(e) => this.handleZipChange(e)}
          value={this.state.inputZip}
        />
        <CitySearchField
          cityChanged={(e) => this.handleCityChange(e)}
          value={this.state.inputCity}
        />
        <div>
        {this.state.cityResults.map((item,index)=>{
          return <City data={item} key={index}/>;
        })}
        
        {this.state.zipResults.map(item => {
          return  (<Zip data={item}/>
          )
          
        })}
        

        </div>
      </div>
    );
  }
}

export default App;
