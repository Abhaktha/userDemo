import React, { useState, useEffect } from "react";
import './App.css';
import UserContextApp from "./components/user/user-screen-context";
import AppBar from './components/app-bar';

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: "#eeeeee",
      height: windowSize.innerHeight,
    }}>
      <AppBar />
      <UserContextApp innerHeight={windowSize.innerHeight}/>
    </div>
  );
}

function getWindowSize() {
  let { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default App;
