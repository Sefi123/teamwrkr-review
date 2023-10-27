import { useState, useEffect, useRef } from "react";

// eslint-disable-next-line no-unused-vars
export function useClickListener(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef();

  const handleClose = () => {
    setIsComponentVisible(false);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref?.current?.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible, handleClose };
}
