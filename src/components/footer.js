import React from "react";
import { HomeIcon, FooterGeo, Report, HistoryIcon, 
  // SquadsIcon
 } from "../assets/icons";
import { NavLink } from "react-router-dom";

const links = [
  {
    path: "/",
    label: "Главная",
    icon: <HomeIcon />,
  },
  {
    path: "/tracking",
    label: "Отслеживать",
    icon: <FooterGeo />,
  },
  {
    path: "/report",
    label: "Отчет",
    icon: <Report />,
  },
  {
    path: "/histories",
    label: "История",
    icon: <HistoryIcon />,
  },
  // {
  //   path: "/squads",
  //   label: "Сквады",
  //   icon: <SquadsIcon />,
  // },
];

const Footer = () => {
  return (
    <footer className="global-footer">
      {links.map((link) => (
        <NavLink key={link.path} to={link.path}>
          {link.icon}
          <span>{link.label}</span>
        </NavLink>
      ))}
    </footer>
  );
};

export default Footer;
