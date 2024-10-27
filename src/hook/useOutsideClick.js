import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
