import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./scenes/browsePage";
import HomePage from "./scenes/homePage";
import NavBar from "./scenes/navbar";
import ProfilesPage from "./scenes/profilePage";
import LoginPage from "./scenes/loginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/navbar" element={<NavBar/>} />
        <Route path="/profile" element={<ProfilesPage/>}/>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;