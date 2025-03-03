import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Layout from './components/layout';
import  Home  from './pages/Home';
const App: React.FC = () => (
  <>
    <Layout>
      <Home />
    </Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>

    
  </>
);
export default App
