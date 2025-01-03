import React from "react";

const BookLibrary = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 40 40"
      style={{ enableBackground: "new 0 0 40 40" }}
      xmlSpace="preserve"
    >
      <style type="text/css" jsx>
        {`
          .bookpath {
            fill: none;
            stroke: #8e56ff;
            stroke-width: 2;
            stroke-miterlimit: 10;
          }
        `}
      </style>
      <g>
        <path
          className="bookpath"
          d="M4.53,4.88H35.5v34h-29c-1.1,0-2-0.9-2-2V4.92C4.5,4.9,4.52,4.88,4.53,4.88z"
        />
        <path
          className="bookpath"
          d="M32.48,4.88V1.12H6.5c-1.1,0-2,0.9-2,2v1.77"
        />
        <line className="bookpath" x1="8.67" y1="4.88" x2="8.67" y2="38.46" />
        <path
          className="bookpath"
          d="M22.52,4.88v14.36c0,0.14,0.17,0.21,0.27,0.11l3.54-3.54c0.06-0.06,0.16-0.06,0.22,0l3.8,3.8 c0.1,0.1,0.27,0.03,0.27-0.11V4.88"
        />
      </g>
    </svg>
  );
};

export default BookLibrary;
