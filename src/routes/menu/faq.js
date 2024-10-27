import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftArrow, SearchIcon } from "../../assets/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Accord from "../../components/accord";

const Faq = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  return (
    <div className="faq-page profile-page report-page">
      <div className="navigation">
        <LeftArrow
          onClick={() => {
            if (
              (window.history?.length && window.history.length > 1) ||
              window.history.state?.idx
            ) {
              navigate(-1);
            } else {
              navigate("/", { replace: true });
            }
          }}
        />
        <span>FAQ</span>
      </div>
      <div className="search-bar">
        <SearchIcon />
        <input type="search" placeholder="Поиск" />
      </div>
      <Swiper slidesPerView={"auto"} spaceBetween={12} className="tags-slider">
        {Array.from({ length: 10 }, (_, index) => (
          <SwiperSlide
            key={index}
            onClick={() => setActive(index)}
            className={index === active ? "active-tag tag" : "tag"}
          >
            <p>Lorem {index + 1}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="accords">
        {Array.from({ length: 10 }, (_, index) => (
          <Accord
            key={index}
            defaultOpen={!index}
            summary={"Lorem ipsum dolor"}
            details={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
