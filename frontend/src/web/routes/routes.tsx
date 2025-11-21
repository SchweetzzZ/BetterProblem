import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../login/login.tsx';
import CadastroPage from '../cadastro/cadastro';
import { HomePage } from '../home/home.tsx';
import { CategoryPage } from '../home/categoryPage.tsx';

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/cadastro" element={<CadastroPage/>}/>
          <Route path="categoria/:name" element={<CategoryPage/>}/>
        </Routes>
      </BrowserRouter>
    );
}