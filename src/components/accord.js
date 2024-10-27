import React, { useState } from "react";
import { ArrowDown } from "../assets/icons";

const Accord = ({ summary, details, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`accord ${open ? "open" : ""}`}>
      <div className="summary" onClick={() => setOpen(!open)}>
        <p>{summary}</p>
        <ArrowDown />
      </div>
      {open && <div className="details">{details}</div>}
    </div>
  );
};

export default Accord;
