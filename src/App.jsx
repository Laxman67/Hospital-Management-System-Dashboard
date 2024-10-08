import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Doctors from './components/Doctors';
import Login from './components/Login';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctors from './components/AddNewDoctors';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { Context } from './main';
import axios from 'axios';
export const App = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doctor/addnew' element={<AddNewDoctors />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/doctors' element={<Doctors />} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </>
  );
};

export default App;
