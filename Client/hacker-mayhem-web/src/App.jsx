import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Footer, Login, Navbar, Workspace } from "./components";
import styles from './style';
import Home from './Home';
import Signup from './components/Signup';
import Terms from './components/TermsCond';
import Blog from './components/Blogs';
import Labs from './components/Labs';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Terms" element={<Terms />} />
          <Route exact path="/Labs" element={<Labs />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/BLogs" element={<Blog />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
