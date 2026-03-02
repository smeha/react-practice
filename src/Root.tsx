import { useState } from "react";
import AppJS from "./js/AppJS";
import AppTS from "./ts/AppTS";

type Page = "home" | "js" | "ts";

export default function Root() {
  const [page, setPage] = useState<Page>("home");

  if (page === "js") {
    return (
      <>
        <nav style={navStyle}>
          <button type="button" onClick={() => setPage("home")} style={backStyle}>← Back</button>
          <span style={{ fontWeight: 600, flex: 1, textAlign: "center" }}>JavaScript (JSX)</span>
        </nav>
        <AppJS />
      </>
    );
  }

  if (page === "ts") {
    return (
      <>
        <nav style={navStyle}>
          <button type="button" onClick={() => setPage("home")} style={backStyle}>← Back</button>
          <span style={{ fontWeight: 600, flex: 1, textAlign: "center" }}>TypeScript (TSX)</span>
        </nav>
        <AppTS />
      </>
    );
  }

  return (
    <div style={homeStyle}>
      <h1 style={{ marginBottom: 8 }}>React Practice</h1>
      <p style={{ color: "#666", marginBottom: 40 }}>Pick a version to practice</p>
      <div style={{ display: "flex", gap: 24 }}>
        <button type="button" onClick={() => setPage("js")} style={cardStyle("#f7df1e", "#000")} className="select-card">
          <span style={{ fontSize: 48 }}>JS</span>
          <span>JavaScript</span>
          <span style={{ fontSize: 12, opacity: 0.7 }}>.jsx</span>
        </button>
        <button type="button" onClick={() => setPage("ts")} style={cardStyle("#3178c6", "#fff")} className="select-card">
          <span style={{ fontSize: 48 }}>TS</span>
          <span>TypeScript</span>
          <span style={{ fontSize: 12, opacity: 0.7 }}>.tsx</span>
        </button>
      </div>
    </div>
  );
}

const homeStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = (bg: string, color: string): React.CSSProperties => ({
  background: bg,
  color,
  border: "none",
  borderRadius: 16,
  padding: "32px 48px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  fontSize: 18,
  fontWeight: 600,
  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
});

const navStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: "12px 16px",
  borderBottom: "1px solid #e5e5e5",
  background: "#fafafa",
};

const backStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid #ccc",
  borderRadius: 6,
  padding: "4px 10px",
  cursor: "pointer",
};
