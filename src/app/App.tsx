import { useState, useEffect } from "react";
import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial width and set the state
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    // Listen to resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();

  // If we haven't mounted yet, render desktop app but it doesn't matter much (or could return null to avoid hydration mismatch)
  return isMobile ? <MobileApp /> : <DesktopApp />;
}
