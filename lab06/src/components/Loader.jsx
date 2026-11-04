export default function Loader({ text = "Loading…" }) {
  return (
    <div className="status" role="status">
      <div className="loader__spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}
