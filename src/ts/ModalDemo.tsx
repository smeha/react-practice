import { useEffect, useRef, useState } from "react";

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  );
}

type ModalProps = { onClose: () => void };

function Modal({ onClose }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button, input, [tabindex]")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose(); // backdrop
      }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center" }}
    >
      <div ref={panelRef} style={{ background: "white", padding: 16, borderRadius: 8 }}>
        <h3>Modal</h3>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
