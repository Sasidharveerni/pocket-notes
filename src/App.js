import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeSection from "./pages/HomeSection";
import NotesSection from "./pages/NotesSection";


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSection />} />
          <Route path="/:name" element={<NotesSection />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
