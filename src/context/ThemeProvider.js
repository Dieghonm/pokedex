import React, { useState } from 'react';
import ThemeContext from './ThemeContext';


export default function ThemeProvider({ children }) {
  const [pokemons, setPokemons] = useState({});
  
  const fetchPokemon = (endpoint) => {
    const ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${endpoint}`
    console.log(ENDPOINT);
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(response => setPokemons(response))
  }

  const context = { 
    pokemons,
    fetchPokemon,
  }

  return (
    <ThemeContext.Provider value={context}>
      <div>
        { children }
      </div>
    </ThemeContext.Provider>
  );
}