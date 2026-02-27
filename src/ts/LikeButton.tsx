import React, { useState } from "react";

function fakeToggleLike(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (Math.random() < 0.2 ? reject(new Error("Failed")) : resolve()), 250);
  });
}

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onClick = async () => {
    const next = !liked;
    setErr(null);
    setLiked(next);      // optimistic
    setSaving(true);
    try {
      await fakeToggleLike();
    } catch (e) {
      setLiked(!next);   // revert
      setErr((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button onClick={onClick} disabled={saving}>
        {liked ? "♥ Liked" : "♡ Like"}
      </button>
      {saving && <span> saving…</span>}
      {err && <div style={{ color: "crimson" }}>{err}</div>}
    </div>
  );
}
