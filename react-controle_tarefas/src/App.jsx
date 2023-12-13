import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Home from './components/pages/home/Home'
import Tarefas from './components/pages/tarefas/Tarefas'
import NovaTarefa from './components/pages/novatarefa/NovaTarefa'
import CadastroUser from './components/pages/cadastrausuario/CadastraUsuarios'
import Usuarios from './components/pages/usuarios/Usuarios'
import EditarUsuario from './components/pages/editeUsuario/EditeUsuario'
import Login from './components/pages/telaLogin/TelaLogin'
import Navbar from './components/layout/navbar/NavBar'
import Container from './components/layout/container/Container'
import Footer from './components/layout/footer/Footer'
import EditarTarefa from './components/pages/editarTarefa/EditarTarefas'
import PropTypes from 'prop-types';
import { AuthProvider, useAuth } from './components/authProvider/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  return autenticado ? children : <Navigate to="/login" />;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();



  return (
    <Router>

      {autenticado && <Navbar />}

      <Routes>

        <Route path='/login' element={
          <Login />
        } />
        <Route path="/" element={autenticado ? <Navigate to="/tarefas" /> : 
        <Login />} />

        <Route exact path='/home' element={<Container pageClass='min-height'>
          <ProtectedRoute><Home /></ProtectedRoute>
        </Container>} />

        <Route path='/tarefas' element={<Container pageClass='min-height'>
        <ProtectedRoute><Tarefas /></ProtectedRoute>
        </Container>} />

        
        <Route path='/usuarios' element={<Container pageClass='min-height'>
          <ProtectedRoute><Usuarios /></ProtectedRoute>
        </Container>} />

        <Route path='/novatarefa' element={<Container pageClass='min-height'>
          <ProtectedRoute><NovaTarefa /></ProtectedRoute>
        </Container>} />

        <Route path='/editartarefa/:id' element={<Container pageClass='min-height'>
          <ProtectedRoute><EditarTarefa /></ProtectedRoute>
        </Container>} />

        <Route path='/editarusuario/:id' element={<Container pageClass='min-height'>
          <ProtectedRoute><EditarUsuario /></ProtectedRoute>
        </Container>} />


        <Route path="/cadastroUser" element={<Container pageClass="min-height">
          <CadastroUser />
        </Container>} />


      </Routes>

      { autenticado && <Footer />}

    </Router>
  )
};

const App = () => {
  return (
      <AuthProvider>
          <RoutesWithAuth/>
      </AuthProvider>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.string.isRequired,
};

export default App
