import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import OS from './pages/OS';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/os" element={<OS />} />
      <Route path="/wishlist" element={<Wishlist />} />
      {/* Legacy and duplicate paths resolve to canonical homepage anchors */}
      <Route path="/jono" element={<Navigate to="/#founder" replace />} />
      <Route path="/about" element={<Navigate to="/#founder" replace />} />
      <Route path="/imed" element={<Navigate to="/#products" replace />} />
      <Route path="/current-projects" element={<Navigate to="/#products" replace />} />
      <Route path="/current-projects-mobile" element={<Navigate to="/#products" replace />} />
      <Route path="/special-projects" element={<Navigate to="/#products" replace />} />
      <Route path="/special-projects-mobile" element={<Navigate to="/#products" replace />} />
      <Route path="/seed2shelf" element={<Navigate to="/#products" replace />} />
      <Route path="/seed2shelf-mobile" element={<Navigate to="/#products" replace />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
