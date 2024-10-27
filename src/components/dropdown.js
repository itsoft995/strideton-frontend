import React, { useState, useRef } from "react";
import { ArrowDown } from "../assets/icons";
import useOutsideClick from "../hook/useOutsideClick";

const options = [
  {
    label: "Сегодня",
    value: 0,
  },
  {
    label: "На этой неделе",
    value: 1,
  },
  {
    label: "В этом месяце",
    value: 2,
  },
  {
    label: "В прошлом месяце",
    value: 3,
  },
  {
    label: "Последние 6 месяцев",
    value: 4,
  },
  {
    label: "В этом году",
    value: 5,
  },
  {
    label: "В прошлом году",
    value: 6,
  },
  {
    label: "Все время",
    value: 7,
  },
  {
    label: "Пользовательский диапазон",
    value: 8,
  },
];

const Dropdown = ({ defaultOpen = false, defaulValue = options[1] }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [select, setSelect] = useState(defaulValue);
  const dropdownRef = useRef();

  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="calendar-opener" onClick={() => setOpen(!open)}>
        <span>{select.label}</span>
        <ArrowDown />
      </div>
      <div className={`options ${open ? "active" : " "}`}>
        {options.map((option) => (
          <button key={option.value}
            onClick={() => {
              setSelect(option);
              setOpen(!open);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
