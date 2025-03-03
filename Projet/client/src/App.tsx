import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./App.css";
const url = 'http://localhost:8080/ouvriers';
const router = createRouter({ routeTree });

async function test() {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  
  return null;
}

function App() {
  test()
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
