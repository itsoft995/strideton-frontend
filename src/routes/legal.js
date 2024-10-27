import React from "react";
import { LeftArrow } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const Legal = () => {
  const navigate = useNavigate();
  return (
    <div className="legal-page profile-page report-page">
      <div className="navigation">
        <LeftArrow onClick={() => navigate("/menu")} />
        <span>legal</span>
      </div>
      {[
        "Политика конфиденциальности",
        "Политика использования файлов",
        "Политика возврата и отмены",
        "Соглашение об уровне обслуживания (SLA)",
      ].map((index) => (
        <React.Fragment key={index}>
          <h1 className="title">{index}</h1>
          {Array.from({ length: 8 }, (_, index) => (
            <section key={index}>
              <h2>Lorem ipsum dolor sit amet,</h2>
              <li>
                <span>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi
                </span>
              </li>
            </section>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Legal;
