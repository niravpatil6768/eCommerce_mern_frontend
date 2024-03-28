import logo from "./logo.svg";
import "./App.css";
import Products from "./components/products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addproduct from "./components/addProduct";
import Updateproduct from "./components/updateProduct";

function App() {
  return (
    // <div className="App">
    //   <Products />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/addProduct" element={<Addproduct />} />
        <Route path="/updateProduct/:id" element={<Updateproduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
