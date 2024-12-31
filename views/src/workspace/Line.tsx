import React from "react";
import "../css/Line.css"; // Import the CSS file for styling

interface Props{
    x1: number;  // The starting point of the line
    y1: number;
    x2: number;   // The ending point of the line
    y2: number;
}

const Line: React.FC<Props> = ({ x1, y1, x2, y2 }) => {
    const HEIGHT = 50;
    const WIDTH = 100;

    if(x1+WIDTH < x2){
        x1 += WIDTH;
    }
    else if(x1 > x2+WIDTH){
        x2 += WIDTH;
    }
    else{
        x1 += WIDTH/2;
        x2 += WIDTH/2;
    }

    if(y1+HEIGHT < y2){
        y1 += HEIGHT;
    }
    else if(y1 > y2+HEIGHT){
        y2 += HEIGHT;
    }
    else{
        y1 += HEIGHT/2;
        y2 += HEIGHT/2;
    }

  // Calculate the length and angle of the line
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Style the line using CSS properties

  return (
    <div>
        <div className="line" 
        style={
            {
                position: "absolute", top: `${y1}px`, left: `${x1}px`, 
                width: `${length}px`, height: "0", border:"1px solid black",
                transformOrigin: "top left", 
                transform: `rotate(${angle}deg)`
            }
        }>

        </div>

        {/* <svg>
            <circle cx={x2} cy={y2} r={56}fill="black" />
        </svg> */}

        <div className="pointer" 
        style={
                {position: "absolute", top: `${y2}px`, left: `${x2}px`, 
                width: "0", height: "0", 
                borderLeft: "6px solid transparent", 
                borderRight: "6px solid transparent", 
                borderTop: "6px solid black", 
                borderBottom:"6px solid black",
                // transformOrigin: "top left", 
                // transform: `rotate(-${angle}deg)`
                }
            }>

            </div>
    </div>
  );
}

export default Line;
