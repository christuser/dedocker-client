import './App.css';
import "./styles/navbar.css";
import "./styles/app-body.css";

import { Box } from "@mui/material";
import { useEffect, useState } from 'react';
import { WelcomeScreen } from './screens/Welcome';
import { connectWalletToSite, getWalletAddress } from './utils/wallet';
import { BsPerson } from "react-icons/bs"
import { createUser } from './api/user';
import { TbSearch } from 'react-icons/tb';
import BgImg from "./assets/background-spheron.png"

function App() {
  const [input, setInput] = useState("");
  const [connectedToSite, setConnectedToSite] = useState(false);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);

  async function connectSite() {
    await connectWalletToSite();
    const address = await getWalletAddress()
    if (address && address !== "") {
      const token = localStorage.getItem("token");
      if (!token || token === "") {
        await createUser(address);
        setConnectedToSite(true)
      }
    }
  }

  function onCloseWelcome() {
    setIsWelcomeScreen(false);
  }

  const handleKeyDown = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && value !== "") {
      window.location.replace(`/explore?query=${value}`);
    }
  };

  const onSearch = (event) => {
    if (input !== "") {
      window.location.replace(`/explore?query=${input}`);
    }
  };

  useEffect(() => {
    const isWelcome = localStorage.getItem("welcome");
    if (isWelcome !== "true") {
      setIsWelcomeScreen(true);
    }
    connectSite()
  }, [])


  return (
    <div className="App">
      {isWelcomeScreen ? (
        <WelcomeScreen onCloseWelcome={onCloseWelcome} />
      ) : (<div className="App">
        <Box sx={{ p: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ff92a2", color: "white", fontWeight: "700" }}>
          🎗️ Things might break 🎗️
        </Box>
        <Box position={"absolute"} right={0} sx={{ backgroundImage: `url('${BgImg}')`, backgroundPosition: "right", backgroundRepeat: "no-repeat", width: "100vw", height: "100vh", filter: "brightness(2)" }}>
        </Box>
        <div className="navbar">
          <div>
            <h1>⚡Dedocker</h1>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!connectedToSite ? <Box onClick={connectSite} className="upload-button">
              Connect Wallet
            </Box> : <Box className="profile-icon">
              <BsPerson size={30} /> </Box>}
          </div>
        </div>
        <Box className="body">
          <Box className="main-title">
            <p className="nft-title">Decentralized docker registry</p>
            <p>
              <span className="nft-title">powered by Spheron</span>
            </p>
          </Box>
          {/* Search Bar */}
          <Box
            sx={{
              width: { xs: "85vw", sm: "70vw", md: "35vw" },
              backgroundColor: "white",
              padding: "12px 4px 12px 24px",
              display: "flex",
              alignItems: "center",
              borderRadius: "28px",
              border: "0.5px solid grey"
            }}
            className="search"
          >
            <TbSearch
              onClick={onSearch}
              color="grey"
              cursor={"pointer"}
              size={18}
            />
            <input
              type="search"
              id="search"
              onKeyDown={handleKeyDown}
              placeholder="Search registry..."
              value={input}
              onInput={(e) => setInput(e.target.value)}
              style={{ border: "none", marginLeft: "12px" }}
            />
          </Box>
        </Box>
      </div>)}
    </div>
  );
}

export default App;
