import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  Layout from './components/layout';
import  Home  from './pages/Home';
const url = 'http://localhost:8080/ouvriers';

async function test() {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  
  return null;
}
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
