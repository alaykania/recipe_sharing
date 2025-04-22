import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import FormComponent from './components/Upload_recipe';
import Homepage from './components/Homepage';
import Footer from './components/Footer';
import Edit from './components/Edit';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
        <Route path="/" element={<Homepage/>}></Route>
          <Route path="/upload" element={<FormComponent/>}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
