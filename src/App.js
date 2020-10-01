import React from 'react';
import logo from './logo.svg';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

function App() {

  const openToast = () => {
    toast.error('Hello World !');
  }
  return (
    <div className="App">
      <Button variant="danger" onClick={openToast} style={{ marginTop: '20px' }}>Click</Button>
      <ToastContainer />
    </div>
  );
}

export default App;
