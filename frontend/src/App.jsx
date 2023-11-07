import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDevis from "./pages/FormDevis";

function App() {

  	return (
    	<>
    		<h1>Application final</h1>
    		<h2 className=" bg-yellow-400">Tailwind</h2>
    		<BrowserRouter>
      			<Routes>
				  <Route path="/formdevis" element={<FormDevis />} />
      			</Routes>
    		</BrowserRouter>
  		</>
  )
}

export default App
