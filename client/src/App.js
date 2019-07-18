import React from 'react';
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
   
        <p>
         {JSON.stringify(weather)}
        </p>
  );
}

export default App;
