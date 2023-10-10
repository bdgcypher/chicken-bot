import React from 'react';

export default function Farmer({source, position}) {
    return (
        <img
        src={source}
        alt="Moving picture of farmer"
        className="h-24 w-20"
        style={{
          objectFit: "cover",
          position: "absolute",
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
      />
    )
}