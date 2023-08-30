import { UserContextProvider } from "./contexts/UserContext.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios"
import Register from "./pages/register"
import Login from "./pages/login";
import Home from "./pages/home";
import ToasterProvider from "./components/toast-provider.jsx";
import Profile from "./pages/Profile.jsx";
import Chat from "./pages/chat.jsx";
import { ChatContextProvider } from "./contexts/ChatContext.jsx";
import NotFound from "./pages/not-found.jsx";


function App() {

  return (
    <div style={{
      background: "url(/assets/7.jpg) rgba(0,0,0,0.9)",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      width: "100%",
      height: "100vh",
      backgroundBlendMode: "darken"
    }}>
      <ToasterProvider />
      <UserContextProvider>
        <ChatContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ChatContextProvider>
      </UserContextProvider>
    </div>

  )
}

export default App
