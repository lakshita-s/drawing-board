import { useState } from "react";
import { socket } from "./socket";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import "./App.css";
import { useEffect } from "react";

export default function App() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [userCount, setUserCount] = useState(0);
  const [tool, setTool] = useState("pen");
  const [emoji, setEmoji] = useState("⭐");

  // The server sends "clear" back to everyone, including us
  const handleClear = () => socket.emit("clear");

  // it's on screen, so it's state
  useEffect(() => {
    socket.on("users", setUserCount);
    socket.emit("getUsers");
    return () => socket.off("users", setUserCount);
  }, []);

  <p>🟢 {userCount} online</p>;

  return (
    <main>
      <h1>shared drawing board</h1>
      <Toolbar
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        onClear={handleClear}
        tool={tool}
        setTool={setTool}
        emoji={emoji}
        setEmoji={setEmoji}
      />
      <Canvas color={color} size={size} tool={tool} emoji={emoji} />
      <h1>Users Online: {userCount}</h1>
    </main>
  );
}
