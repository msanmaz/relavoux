import React from 'react';

const ShoppingBag = ({
    size = "20",
    color = "currentColor",
    ...attributes
  }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width={size}
      height={size}
      {...attributes}
      viewBox="0 0 256 256"
      xmlSpace="preserve"
    >
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <path
          d="M 72.692 28.948 c -0.188 -2.03 -1.867 -3.562 -3.906 -3.562 h -6.481 v -8.082 C 62.305 7.763 54.542 0 45 0 S 27.695 7.763 27.695 17.305 v 8.082 h -6.482 c -2.039 0 -3.718 1.531 -3.905 3.562 L 12.08 85.719 c -0.101 1.096 0.266 2.189 1.007 3.002 C 13.829 89.534 14.884 90 15.984 90 h 58.031 c 1.1 0 2.155 -0.466 2.896 -1.278 s 1.109 -1.907 1.009 -3.003 L 72.692 28.948 z M 29.695 17.305 C 29.695 8.866 36.561 2 45 2 c 8.439 0 15.305 6.866 15.305 15.305 v 8.082 H 29.695 V 17.305 z M 75.435 87.374 C 75.066 87.777 74.563 88 74.016 88 H 15.984 c -0.547 0 -1.051 -0.223 -1.419 -0.627 c -0.369 -0.403 -0.544 -0.926 -0.494 -1.471 L 19.3 29.131 c 0.092 -0.995 0.915 -1.745 1.914 -1.745 h 6.482 v 4.741 c -1.83 0.451 -3.195 2.094 -3.195 4.062 c 0 2.313 1.882 4.195 4.195 4.195 c 2.313 0 4.195 -1.882 4.195 -4.195 c 0 -1.967 -1.366 -3.61 -3.195 -4.061 v -4.741 h 30.609 v 4.741 c -1.83"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'rgb(0,0,0)',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="matrix(1 0 0 1 0 0)"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default ShoppingBag;
