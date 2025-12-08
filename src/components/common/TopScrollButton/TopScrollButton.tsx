import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 300;

const TopScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 bg-sky-400 text-white p-1 rounded-full shadow-lg hover:bg-sky-700 transition-all duration-300 w-12 h-12 flex items-center justify-center z-40"
      aria-label="맨 위로 스크롤"
    >
      TOP
    </button>
  );
};

export default TopScrollButton;
