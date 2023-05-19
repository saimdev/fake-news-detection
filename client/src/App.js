import './App.css';
import {Home} from './Pages/Home';
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={[<Home />]}
            path="/"
          />
          <Route element={[<Home />]}
            path="/home"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;