import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import View from './Components/View'
import Edit from './Components/Edit'

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/view' element={<View />}/>
        <Route path='/edit/:index' element={<Edit />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
