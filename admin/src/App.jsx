import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';

//export const backendUrl = "http://localhost:4000"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='app-container'>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={
            token === "" ? (
              <Login setToken={setToken} />
            ) : (
              <Navigate to="/add" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            token === "" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/add" replace />
            )
          }
        />
        {token !== "" && (
          <>
            <Route
              path="*"
              element={
                <div className="app_content">
                  <Sidebar setToken={setToken} />
                  <div className="page-content">
                    <Routes>
                      <Route path="/add" element={<Add token={token} />} />
                      <Route path="/list" element={<List token={token} />} />
                      <Route path="/orders" element={<Orders token={token} />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;