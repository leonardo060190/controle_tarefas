import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/pages/home/Home'
import Tarefas from './components/pages/tarefas/Tarefas'
import NovaTarefa from './components/pages/novatarefa/NovaTarefa'
import CadastroUser from './components/pages/cadastrausuario/CadastraUsuarios'

import Navbar from './components/layout/navbar/NavBar'
import Container from './components/layout/container/Container'
import Footer from './components/layout/footer/Footer'



function App() {


  return (
    <Router>

      <Navbar />

      <Routes>

        <Route exact path='/' element={<Container pageClass='min-height'>
          <Home />
        </Container>}/>

        <Route exact path='/tarefas' element={<Container pageClass='min-height'>
          <Tarefas />
        </Container>}/>

        <Route exact path='/novatarefa' element={<Container pageClass='min-height'>
          <NovaTarefa />
        </Container>}/>
        <Route path="/cadastroUser" element={<Container pageClass="min-height">
          <CadastroUser />
        </Container>} />


      </Routes>

      <Footer />

    </Router>
  )
}

export default App
