// Toolbar.jsx
export default function Toolbar({
  color,
  setColor,
  size,
  setSize,
  onClear,
  tool,
  setTool,
  emoji,
  setEmoji,
}) {
  return (
    <div className="toolbar">
      <label>
        color
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <label>
        size
        <input
          type="range"
          min="1"
          max="30"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        {size}px
      </label>

      <button onClick={() => setTool("pen")} disabled={tool === "pen"}>
        Pen
      </button>
      <button onClick={() => setTool("eraser")} disabled={tool === "eraser"}>
        Eraser
      </button>

      <button onClick={onClear}>Clear</button>

      <button onClick={() => setTool("stamp")} disabled={tool === "stamp"}>
        Stamp
      </button>
      <select value={emoji} onChange={(e) => setEmoji(e.target.value)}>
        <option>⭐</option>
        <option>❤️</option>
        <option>🌸</option>
      </select>
    </div>
  );
}
