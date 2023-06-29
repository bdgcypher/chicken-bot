import { useEffect, useState, useRef } from 'react';

const Farmer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState("farmer_front.png");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prevKeysPressed) => {
        const updatedKeysPressed = new Set(prevKeysPressed);
        updatedKeysPressed.add(event.code);
        return updatedKeysPressed;
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prevKeysPressed) => {
        const updatedKeysPressed = new Set(prevKeysPressed);
        updatedKeysPressed.delete(event.code);
        return updatedKeysPressed;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const moveInterval = setInterval(() => {
      const newPosition = { ...position };
      const newSource = { source: "farmer_front.png"};

      if (keysPressed.has('ArrowUp') && newPosition.y > 0) {
        newPosition.y -= 10;
        newSource.source = "farmer_back1.gif";
      }
      if (keysPressed.has('ArrowDown') && newPosition.y < containerHeight - 110) {
        newPosition.y += 10;
        newSource.source = "farmer_front1.gif";
      }
      if (keysPressed.has('ArrowLeft') && newPosition.x > 0) {
        newPosition.x -= 10;
        newSource.source = "farmer_left1.gif";
      }
      if (keysPressed.has('ArrowRight') && newPosition.x < containerWidth - 90) {
        newPosition.x += 10;
        newSource.source = "farmer_right1.gif";
      }

      setPosition(newPosition);
      setSource(newSource.source);
    }, 16); // Adjust the interval as needed

    return () => {
      clearInterval(moveInterval);
    };
  }, [position, keysPressed]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-green-600 overflow-hidden"
    >
      <img
        src="background.gif"
        alt="green grass background"
        className="h-full w-full"
      />
      <img
        src={source}
        alt="Moving Image"
        className="h-24 w-20"
        style={{
          objectFit: "cover",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      />
    </div>
  );
};

export default Farmer;
