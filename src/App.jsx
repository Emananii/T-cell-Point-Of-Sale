import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import POS from './Components/POS/POS';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<POS />} />
      </Routes>
    </Router>
  );
}

export default App;