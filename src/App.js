import './App.css';
import Main from './Components/Main';
import ThemeProvider from './context/ThemeProvider';

function App() {
  return (
    <ThemeProvider >
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
