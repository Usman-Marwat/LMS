import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Create";
import Details from "./Details";
import NotFound from "./NotFound";
import DeletAssignment from "./DeleteAssignment";

// import Chart from "./charts/Bar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/classes/:id" element={<Details />}></Route>
            <Route
              path="/deleteAssignment/:id"
              element={<DeletAssignment />}
            ></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
