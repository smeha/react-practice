import { useState } from "react";

// Mock wizard data (mirrors the shape from the coderbyte API)
const MOCK_WIZARDS = [
  { name: "Harry", house: "Gryffindor", friends: ["Ron", "Hermione", "Neville", "Ginny"] },
  { name: "Hermione", house: "Gryffindor", friends: ["Harry", "Ron"] },
  { name: "Ron", house: "Gryffindor", friends: ["Harry", "Hermione", "Fred"] },
  { name: "Draco", house: "Slytherin", friends: ["Crabbe", "Goyle", "Pansy", "Blaise", "Millicent"] },
  { name: "Pansy", house: "Slytherin", friends: ["Draco"] },
  { name: "Luna", house: "Ravenclaw", friends: ["Neville", "Harry", "Ginny", "Rolf"] },
  { name: "Cho", house: "Ravenclaw", friends: ["Marietta"] },
  { name: "Cedric", house: "Hufflepuff", friends: ["Justin", "Ernie", "Hannah", "Susan", "Zacharias"] },
  { name: "Hannah", house: "Hufflepuff", friends: ["Ernie", "Justin"] },
];

function bestPerHouse(data) {
  const best = {};
  for (const char of data) {
    const house = char.house?.trim();
    if (!house) continue;
    const count = char.friends?.length ?? 0;
    if (!(house in best)) { best[house] = char; continue; }
    const b = best[house];
    const bCount = b.friends?.length ?? 0;
    if (count > bCount || (count === bCount && char.name.localeCompare(b.name) < 0)) {
      best[house] = char;
    }
  }
  return Object.fromEntries(Object.entries(best).map(([h, c]) => [h, { name: c.name, friends: c.friends?.length }]));
}

export function WizardHouseFriends() {
  const [result, setResult] = useState(null);

  function run() {
    setResult(bestPerHouse(MOCK_WIZARDS));
  }

  return (
    <div>
      <button onClick={run}>Run</button>
      {result && (
        <ul>
          {Object.entries(result).map(([house, { name, friends }]) => (
            <li key={house}><strong>{house}</strong>: {name} ({friends} friends)</li>
          ))}
        </ul>
      )}
    </div>
  );
}
