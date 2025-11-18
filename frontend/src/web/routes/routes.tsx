import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../login/login.tsx';
import CadastroPage from '../cadastro/cadastro';

export default function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/cadastro" element={<CadastroPage/>}/>
        </Routes>
      </BrowserRouter>
    );
}