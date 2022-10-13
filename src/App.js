import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Forgot from './Components/Forgot';
import Conform from './Components/Conform';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/Forgot' element={<Forgot/>}/>
        <Route path='/Reset-Password/:id/:token' element={<Conform/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
