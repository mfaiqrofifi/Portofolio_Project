export default function Footer() {
  return (
    <footer
      className="mt-16 py-4 px-5 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <p
        className="font-mono text-xs max-w-6xl mx-auto"
        style={{ color: "var(--muted-dim)" }}
      >
        <span style={{ color: "var(--accent)" }}>$</span>{" "}
        faiq.dev &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
