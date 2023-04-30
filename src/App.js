import './App.css';
import Pokemons from './Components/Pokemons';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider >
      <div className="App">
        <Pokemons />
      </div>
    </ThemeProvider>
  );
}

export default App;
