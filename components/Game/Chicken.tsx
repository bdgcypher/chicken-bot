import React from 'react';

export default function Chicken({source, position}) {
    return (
        <img
        src={source}
        alt="Moving Image"
        className="h-32 w-32"
        style={{
          objectFit: "cover",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      />
    )
}