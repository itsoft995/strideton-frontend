import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TrashIcon } from "../assets/icons";
import "swiper/css";
const SwipeableListItem = ({ children }) => {
  const [statusDeleted, setStatusDeleted] = useState(false);
  const swiperRef = useRef();
  const [timeOut, setTimeOut] = useState(null);
  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={"auto"}
        onSlideChangeTransitionEnd={(swiper) => {
          setStatusDeleted(!!swiper.activeIndex);
          if (!!swiper.activeIndex) {
            setTimeOut(
              setTimeout(() => {
                setStatusDeleted(false);
                if (swiperRef.current) {
                  swiperRef.current.remove();
                  clearTimeout(timeOut); // Birinchi slaydga o'tish
                }
              }, 2000)
            );
          } else {
            clearTimeout(timeOut);
          }
        }}
      >
        <SwiperSlide className="list-swiper">{children}</SwiperSlide>
        <SwiperSlide className="list-swiper-delete">
          <TrashIcon />
        </SwiperSlide>
      </Swiper>

      <div
        className={`toast-deleted-history ${statusDeleted ? "visible" : ""}`}
      >
        <div className="left">
          <TrashIcon />
          <span>История удалена</span>
        </div>
        <button
          onClick={() => {
            setStatusDeleted(false);
            if (swiperRef.current) {
              swiperRef.current.swiper.slidePrev();
              clearTimeout(timeOut); // Birinchi slaydga o'tish
            }
          }}
        >
          Отменить
        </button>
      </div>
    </>
  );
};

export default SwipeableListItem;
