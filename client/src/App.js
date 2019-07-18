import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [weather, setWeather] = React.useState(null);

  React.useEffect( () => {
    async function fetchData() {
    let data = await fetch('/api');
    data = await data.json();
    setWeather(data);
    }
    fetchData();
     }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         {JSON.stringify(weather)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
