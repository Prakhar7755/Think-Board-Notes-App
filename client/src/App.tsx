import React from "react";
import { Routes,Route } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import CreatePage from "./pages/CreatePage.js";
import NoteDetailPage from "./pages/NoteDetailPage.js";

const App :React.FC= () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 w-full h-full  items-center px-5 py-24  [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}/>
          <Route path="/create" element={<CreatePage></CreatePage>}/>
          <Route path="/note/:id" element={<NoteDetailPage></NoteDetailPage>}/>
        </Routes>
      </div>

    </div>
   )
};

export default App;
