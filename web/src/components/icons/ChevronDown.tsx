import React from "react";

const ChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export default ChevronDown;
