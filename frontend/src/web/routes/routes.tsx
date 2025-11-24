import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../login/login.tsx';
import CadastroPage from '../cadastro/cadastro';
import { HomePage } from '../home/home.tsx';
import { CategoryPage } from '../categoryPage/categoryPage.tsx';

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/cadastro" element={<CadastroPage/>}/>
          <Route path="categoria/:name" element={<CategoryPage/>}/>
          <Route path="ofertas" element={<p>Ofertas</p>}/>
          <Route path="/usuario/:id" element={<p>Usuario</p>} />
        </Routes>
      </BrowserRouter>
    );
}