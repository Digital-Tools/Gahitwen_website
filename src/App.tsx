import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollManager from './components/layout/ScrollManager';
import Home from './pages/Home';
import Products from './pages/Products';
import DataOpsDrive from './pages/DataOpsDrive';
import Systems from './pages/Systems';
import Services from './pages/Services';
import Quote from './pages/Quote';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import GoogleAnalytics from './components/analytics/GoogleAnalytics';

function App() {
  return (
    <Router>
      <ScrollManager />
      <GoogleAnalytics />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/dataops-drive" element={<DataOpsDrive />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/services" element={<Services />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;