import './App.css';
import PokemonStats from './Components/PokemonStats';
import Pokemons from './Components/Pokemons';
import ThemeProvider from './context/ThemeProvider';
import { Routes, Route, Outlet, Link } from "react-router-dom";

function App() {
  return (
    <ThemeProvider >
      <div className="App">
        <Routes>
          <Route path="/pokedex" element={<Pokemons />} />
          <Route path="/pokedex/:number" element={<PokemonStats />} />
          <Route path='*' element={<Pokemons />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
