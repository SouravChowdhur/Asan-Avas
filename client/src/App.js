import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from 'react-redux';
import {store} from './redux/store';
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <Provider store={store}>
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/create-listing" element={<CreateListing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
