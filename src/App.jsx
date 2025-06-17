import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import MostPopular from './pages/Mostpopular';
import Bollywood from './pages/Bollywood';
import Hollywood from './pages/Hollywood';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:slug" element={<Details />} />
      <Route path="/most-popular" element={<MostPopular />} />
      <Route path="/hollywood" element={<Hollywood />} />
      <Route path="/bollywood" element={<Bollywood />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="*" element={<div className="text-white p-4">Page Not Found</div>} />
    </Routes>
  );
}

export default App;
