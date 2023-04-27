import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pages } from "./routes/Pages";
import Home  from "./routes/Pages/Home";
import Admin from "./routes/Pages/Admin";
import Catalogo from "./routes/Pages/Catalogo";
import ProdutoDetalhes from "./components/ProdutoDetalhes";
import CadastroAdmin from "./components/CadastroAdmin";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Pages />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:id" element={<ProdutoDetalhes />} />
          <Route path="/admin/users" element={<CadastroAdmin />} />
        </Route>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
