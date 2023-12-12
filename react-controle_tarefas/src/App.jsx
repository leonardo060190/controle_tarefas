import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/pages/home/Home'
import Tarefas from './components/pages/tarefas/Tarefas'
import NovaTarefa from './components/pages/novatarefa/NovaTarefa'
import CadastroUser from './components/pages/cadastrausuario/CadastraUsuarios'
import Usuarios from './components/pages/usuarios/Usuarios'
import EditarUsuario from './components/pages/editeUsuario/EditeUsuario'
//import Login from './components/pages/telaLogin/TelaLogin'
import Navbar from './components/layout/navbar/NavBar'
import Container from './components/layout/container/Container'
import Footer from './components/layout/footer/Footer'
import EditarTarefa from './components/pages/editarTarefa/EditarTarefas'



function App() {


  return (
    <Router>

      {!window.location.pathname.includes("/login" ) && <Navbar />}

      <Routes>

        {/* <Route exact path='/login' element={
          <Login />
        }/> */}

        <Route exact path='/' element={<Container pageClass='min-height'>
          <Home />
        </Container>} />

        <Route path='/tarefas' element={<Container pageClass='min-height'>
          <Tarefas />
        </Container>} />

        <Route path='/usuarios' element={<Container pageClass='min-height'>
          <Usuarios />
        </Container>} />

        <Route path='/novatarefa' element={<Container pageClass='min-height'>
          <NovaTarefa />
        </Container>} />

        <Route path='/editartarefa/:id' element={<Container pageClass='min-height'>
          <EditarTarefa />
        </Container>} />

        <Route path='/editarusuario/:id' element={<Container pageClass='min-height'>
          <EditarUsuario />
        </Container>} />


        <Route  path="/cadastroUser" element={<Container pageClass="min-height">
          <CadastroUser />
        </Container>} />


      </Routes>

      {!window.location.pathname.includes("/login") && <Footer />}

    </Router>
  )
}

export default App
