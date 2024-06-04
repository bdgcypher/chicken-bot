import { useEffect, useState, useRef } from 'react';
import Farmer from './Farmer';
import Chicken from './Chicken';

const Game = () => {
  const [farmerPos, setFarmerPos] = useState({ x: 0, y: 0 });
  const [chickenPos, setChickenPos] = useState({ x: 60, y: -20 });

  
  const [farmerImage, setFarmerImage] = useState("farmer_front.png");
  const [chickenImage, setChickenImage] = useState(true);

  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Move Chicken
  const chickenRef = useRef<HTMLImageElement>(null);
  const speed = 4; // Adjust the speed here

  useEffect(() => {
    const container = containerRef.current;
    const chicken = chickenRef.current;

    let xDirection = 1; // Horizontal direction: 1 for right, -1 for left
    let yDirection = 1; // Vertical direction: 1 for down, -1 for up

    const moveChicken = () => {

      // Get container boundaries
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const chickenWidth = chicken.offsetWidth;
      const chickenHeight = chicken.offsetHeight;

      const chickenX = chicken.offsetLeft;
      const chickenY = chicken.offsetTop;

      let newX = chickenX + speed * xDirection;
      let newY = chickenY + speed * yDirection;

      // Reverse direction if the chicken hits the container boundaries
      if (newX + chickenWidth > containerWidth || newX < 0) {
        xDirection = -xDirection;
        setChickenImage(false);
        if (chickenX === 0) {
          setChickenImage(true);
        }
      }
      if (newY + chickenHeight > containerHeight || newY < 0) {
        yDirection = -yDirection;
      }

      chicken.style.left = `${newX}px`;
      chicken.style.top = `${newY}px`;

      requestAnimationFrame(moveChicken);
    };

    moveChicken();
    
    return
  }, []);

  // Key tracking
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

  // Farmer movement - update the farmer position and change the image source to match the direction he is moving
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get the container borders and set the farmers speed
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const farmerSpeed = 6;

    const moveInterval = setInterval(() => {
      const newPosition = { ...farmerPos };
      const newImage = { source: "farmer_front.png"};

      // Move Farmer up
      if (keysPressed.has('ArrowUp') && !keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowRight') && newPosition.y > 0) {
        newPosition.y -= farmerSpeed;
        newImage.source = "farmer_back1.gif";
      }

      // Move Farmer up and left
      if (keysPressed.has('ArrowUp') && keysPressed.has('ArrowLeft') && newPosition.y > 0) {
        newPosition.x -= (farmerSpeed / 1.5);
        newPosition.y -= (farmerSpeed / 1.5);
        newImage.source = "farmer_left1.gif";
      }

      // Move Farmer up and right
      if (keysPressed.has('ArrowUp') && keysPressed.has('ArrowRight') && newPosition.y > 0) {
        newPosition.x += (farmerSpeed / 1.5);
        newPosition.y -= (farmerSpeed / 1.5);
        newImage.source = "farmer_right1.gif";
      }

      // Move Farmer down
      if (keysPressed.has('ArrowDown') && !keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowRight') && newPosition.y < containerHeight - 110) {
        newPosition.y += farmerSpeed;
        newImage.source = "farmer_front1.gif";
      }

      // Move Farmer down and left
      if (keysPressed.has('ArrowDown') && keysPressed.has('ArrowLeft') && newPosition.y > 0) {
        newPosition.x -= (farmerSpeed / 1.5);
        newPosition.y += (farmerSpeed / 1.5);
        newImage.source = "farmer_left1.gif";
      }

      // Move Farmer down and right
      if (keysPressed.has('ArrowDown') && keysPressed.has('ArrowRight') && newPosition.y > 0) {
        newPosition.x += (farmerSpeed / 1.5);
        newPosition.y += (farmerSpeed / 1.5);
        newImage.source = "farmer_right1.gif";
      }

      // Move Farmer left
      if (keysPressed.has('ArrowLeft') && !keysPressed.has('ArrowUp') && !keysPressed.has('ArrowDown') && newPosition.x > 0) {
        newPosition.x -= farmerSpeed;
        newImage.source = "farmer_left1.gif";
      }

      // Move Farmer right
      if (keysPressed.has('ArrowRight') && !keysPressed.has('ArrowUp') && !keysPressed.has('ArrowDown') && newPosition.x < containerWidth - 90) {
        newPosition.x += farmerSpeed;
        newImage.source = "farmer_right1.gif";
      }

      setFarmerPos(newPosition);
      setFarmerImage(newImage.source);
    }, 16); // Adjust the interval as needed

    return () => {
      clearInterval(moveInterval);
    };
  }, [farmerPos, keysPressed]);


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
      <Farmer source={farmerImage} position={farmerPos} />
      {/* <Chicken source={chickenImage} position={chickenPos} /> */}
      <img
        ref={chickenRef}
        src={chickenImage === true ? "/chicken_right.gif" : "/chicken_left.gif"}
        alt="Chicken"
        style={{ position: 'absolute', top: '0', left: '0', height: '200px', width: '200px' }}
      />
    </div>
  );
};

export default Game;
