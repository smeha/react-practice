import { useMemo, useState } from "react";

type TodoItem = { id: string; text: string; done: boolean };

export function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const remaining = useMemo(
    () => todos.reduce((acc, t) => acc + (t.done ? 0 : 1), 0),
    [todos]
  );

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [{ id: crypto.randomUUID(), text: t, done: false }, ...prev]);
    setText("");
  };

  const toggle = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>
      <div>Remaining: {remaining}</div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
            <button onClick={() => remove(t.id)} style={{ marginLeft: 8 }}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
