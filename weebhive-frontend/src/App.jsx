import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./scenes/browsePage";
import HomePage from "./scenes/homePage";
import ProfilesPage from "./scenes/profilePage";
import LoginPage from "./scenes/loginPage";
import BetaDevelopment from "./scenes/beta-features";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        <Route path="/beta" element={<BetaDevelopment />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
