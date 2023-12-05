import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/pages/home/Home'
import Tasks from './components/pages/task/Tasks'
import NewTasks from './components/pages/newtasks/NewTask'

import Navbar from './components/layout/navbar/Navibar'
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

        <Route exact path='/tasks' element={<Container pageClass='min-height'>
          <Tasks />
        </Container>}/>

        <Route exact path='/newtask' element={<Container pageClass='min-height'>
          <NewTasks />
        </Container>}/>
        {/* <Route path="/task/:id" element={<Container pageClass="min-height">
          <Task />
        </Container>} /> */}


      </Routes>

      <Footer />

    </Router>
  )
}

export default App
