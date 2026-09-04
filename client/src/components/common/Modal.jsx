export default function Modal({
  children,
  onClose
}) {

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0005",
        display: "grid",
        placeItems: "center",
        zIndex: 100
      }}
    >

      <div className="card">

        {children}

        <br />

        <button
          className="btn btn-light"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}