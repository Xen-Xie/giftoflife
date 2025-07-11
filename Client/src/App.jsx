import './App.css'
import { Route, Routes } from 'react-router'
import Layout from './Compnents/Layout'
import Home from './Pages/Home'
import FindDonors from './Pages/FindDonors'
import About from './Pages/About'


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path='/find-donor' element={<FindDonors />} />
         <Route path='/about' element={<About />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
