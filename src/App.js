import "./App.css";
import Authentication from "./pages/authentication";
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import GetCaption from './pages/generate';

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>                                                                        
            <Route path="/" element={<Authentication />} />
            <Route path="/caption" element={<GetCaption />} />
            
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;

