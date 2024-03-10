import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import HomeConvertir from "./views/HomeConvertir"
import HomeCruzar from "./views/HomeCruzar"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/convertir" element={<HomeConvertir />} />
      <Route path="/cruzar" element={<HomeCruzar />} />
      <Route render={() => <h1>Not found!</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
