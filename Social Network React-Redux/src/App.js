import { Routes, Route } from "react-router-dom";

import "./App.css";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Header from "./components/Header/Header";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className="app__wrapper">
      <Header />
      <div className="app__content_wrapper">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <div className="app__wrapper_dialogs">
          <Routes>
            <Route path="/dialogs" element={<DialogsContainer />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/music" element={<Music />} />
        </Routes>
        <Routes>
          <Route path="/new" element={<News />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
