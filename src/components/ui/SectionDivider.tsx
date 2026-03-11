export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="max-w-6xl mx-auto px-6">
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,#e7e5e4,transparent)",
        }}
      />
    </div>
  );
}
