import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Header from "./components/header";
import CMS from "./pages/cms";
import CMSBG from "./pages/cmsbg";
import CMSCats from "./pages/cmscats";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <Routes>
            <Route path="/" element={<CMS />} />
            <Route path="/cats" element={<CMSCats />} />
            <Route path="/bg" element={<CMSBG />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
