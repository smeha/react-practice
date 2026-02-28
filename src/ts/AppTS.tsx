import { sections } from "./componentRegistry";

export default function App() {
  return (
    <>
      {sections.map(({ title, description, examples, complexity, component }) => (
        <div key={title} className="section">
          <h4>{title}</h4>
          {description && <p className="description">{description}</p>}
          {complexity && (
            <p className="complexity">
              Time complexity: {complexity.time}; Space complexity: {complexity.space}
            </p>
          )}
          {examples && <p className="examples">Example(s): {examples}</p>}
          {component}
        </div>
      ))}
    </>
  );
}
