import './App.css';
import PokemonStats from './Components/PokemonStats';
import Pokemons from './Components/Pokemons';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider >
      <div className="App">
        <Pokemons />
        <PokemonStats />
      </div>
    </ThemeProvider>
  );
}

export default App;
