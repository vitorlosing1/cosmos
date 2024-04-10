import React from "react";
export const CustomDatePickerInput = React.forwardRef(
  ({ value, onClick }, ref) => (
    <div className="custom-date-picker-input">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        onClick={onClick}
      >
        <g>
          <path
            fill="#0C0C0C"
            d="M9.98,20c-2.6,0-5.2,0-7.8,0c-1.08,0-1.94-0.7-2.15-1.77C0,18.1,0,17.96,0,17.83c0-4.75,0-9.49,0-14.24
		c0-1.23,0.94-2.16,2.18-2.17c0.62,0,1.25-0.01,1.87,0c0.17,0,0.25-0.05,0.23-0.23c-0.01-0.18-0.01-0.36,0-0.53
		C4.3,0.28,4.61,0,5.01,0C5.4,0,5.71,0.29,5.73,0.67c0.01,0.19,0.01,0.37,0,0.56c0,0.14,0.04,0.2,0.19,0.2c1.05,0,2.11,0,3.16,0
		c0.13,0,0.19-0.04,0.19-0.18c-0.01-0.19-0.01-0.37,0-0.56C9.29,0.29,9.6,0,10,0c0.4,0,0.71,0.29,0.73,0.69
		c0.01,0.18,0.01,0.36,0,0.53c-0.01,0.14,0.04,0.2,0.19,0.2c1.05,0,2.11,0,3.16,0c0.13,0,0.19-0.05,0.19-0.18
		c-0.01-0.19-0.01-0.37,0-0.56C14.28,0.29,14.59,0,14.99,0c0.4,0,0.71,0.29,0.73,0.69c0.01,0.15,0,0.3,0,0.45
		c0,0.29,0,0.29,0.3,0.29c0.61,0,1.22,0,1.83,0C19.06,1.43,20,2.37,20,3.57c0,4.76,0,9.52,0,14.28c0,1.2-0.94,2.14-2.16,2.14
		C15.22,20,12.6,20,9.98,20z M10,7.88c-2.74,0-5.48,0-8.22,0c-0.32,0-0.32,0-0.32,0.31c0,3.15,0,6.3,0,9.45
		c0,0.65,0.25,0.91,0.9,0.91c5.09,0,10.19,0,15.28,0c0.64,0,0.9-0.26,0.9-0.89c0-3.16,0-6.31,0-9.47c0-0.31,0-0.31-0.3-0.31
		C15.49,7.88,12.75,7.88,10,7.88z M9.99,6.42c2.73,0,5.47,0,8.2,0c0.07,0,0.13,0,0.2,0c0.12,0,0.16-0.05,0.16-0.16
		c0-0.89,0.01-1.78-0.01-2.67c-0.01-0.4-0.3-0.68-0.7-0.69c-0.65-0.01-1.29,0-1.94-0.01c-0.12,0-0.17,0.05-0.17,0.17
		c0,0.19,0.01,0.37,0,0.56C15.7,4.01,15.4,4.31,15,4.31c-0.4,0-0.72-0.3-0.73-0.71c-0.01-0.18-0.01-0.36,0-0.53
		c0-0.13-0.05-0.18-0.18-0.18c-1.05,0-2.11,0-3.16,0c-0.15,0-0.2,0.06-0.19,0.2c0.01,0.17,0,0.34,0,0.51
		C10.72,4.01,10.41,4.31,10,4.31c-0.4,0-0.72-0.3-0.73-0.71c0-0.18,0-0.36,0-0.53c0-0.12-0.03-0.18-0.16-0.18c-1.07,0-2.14,0-3.21,0
		c-0.13,0-0.17,0.06-0.16,0.18c0,0.18,0,0.36,0,0.53C5.72,4.01,5.42,4.31,5.01,4.31C4.6,4.31,4.29,4,4.28,3.59
		c0-0.15-0.01-0.3,0-0.45c0.02-0.2-0.05-0.27-0.26-0.27c-0.57,0.01-1.14,0-1.72,0.01c-0.58,0-0.85,0.27-0.85,0.85
		c0,0.79,0,1.59,0,2.38c0,0.3,0,0.3,0.31,0.3C4.5,6.42,7.24,6.42,9.99,6.42z"
          />
          <path
            fill="#0C0C0C"
            d="M5,10.7c0.24,0,0.49,0,0.73,0c0.41,0.01,0.71,0.32,0.71,0.73c0,0.41-0.3,0.72-0.71,0.72
		c-0.48,0.01-0.96,0.01-1.45,0c-0.41-0.01-0.72-0.32-0.72-0.72c0-0.42,0.29-0.73,0.72-0.73C4.53,10.69,4.77,10.7,5,10.7z"
          />
          <path
            fill="#0C0C0C"
            d="M10.01,12.15c-0.24,0-0.49,0-0.73,0c-0.41-0.01-0.71-0.32-0.72-0.73c0-0.41,0.29-0.72,0.71-0.73
		c0.49-0.01,0.98-0.01,1.47,0c0.41,0.01,0.71,0.32,0.7,0.73c0,0.4-0.3,0.71-0.7,0.72C10.5,12.16,10.25,12.15,10.01,12.15z"
          />
          <path
            fill="#0C0C0C"
            d="M15,10.7c0.24,0,0.49-0.01,0.73,0c0.4,0.01,0.7,0.32,0.7,0.72c0,0.41-0.29,0.73-0.7,0.73
		c-0.49,0.01-0.98,0.01-1.47,0c-0.41-0.01-0.71-0.33-0.71-0.73c0-0.41,0.3-0.71,0.71-0.72C14.51,10.69,14.75,10.7,15,10.7z"
          />
          <path
            fill="#0C0C0C"
            d="M5.02,14.26c0.24,0,0.49-0.01,0.73,0c0.4,0.01,0.7,0.32,0.7,0.72c0,0.41-0.29,0.73-0.7,0.73
		c-0.49,0.01-0.98,0.01-1.47,0c-0.41-0.01-0.71-0.33-0.71-0.73c0-0.41,0.3-0.71,0.71-0.72C4.53,14.26,4.77,14.26,5.02,14.26z"
          />
          <path
            fill="#0C0C0C"
            d="M9.99,15.72c-0.24,0-0.48,0-0.71,0c-0.41-0.01-0.72-0.32-0.72-0.72c0-0.41,0.29-0.72,0.71-0.73
		c0.49-0.01,0.98-0.01,1.47,0c0.41,0.01,0.71,0.32,0.71,0.73c0,0.4-0.3,0.71-0.7,0.72C10.49,15.73,10.24,15.72,9.99,15.72z"
          />
          <path
            fill="#0C0C0C"
            d="M15,15.72c-0.24,0-0.49,0-0.73,0c-0.41-0.01-0.71-0.32-0.71-0.73c0-0.41,0.29-0.72,0.71-0.73
		c0.49-0.01,0.98-0.01,1.47,0c0.41,0.01,0.71,0.32,0.7,0.73c0,0.4-0.3,0.71-0.7,0.72C15.49,15.72,15.24,15.72,15,15.72z"
          />
        </g>
      </svg>
      <input
        id="picday-date"
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        ref={ref}
        className="date-picker-input"
        placeholder="dd/MM/yyyy"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        onClick={onClick}
      >
        <g>
          <path
            fill="#080D0F"
            d="M0,5.4c0.1-0.3,0.3-0.6,0.5-0.8c0.5-0.4,1.2-0.4,1.7,0c0.1,0.1,0.2,0.2,0.3,0.3C5,7.3,7.4,9.7,9.9,12.2
		c0.1,0.1,0.2,0.1,0.3,0c2.5-2.5,4.9-4.9,7.4-7.4c0.4-0.4,0.9-0.6,1.5-0.4c0.5,0.2,0.8,0.5,0.9,1c0,0,0,0.1,0,0.1c0,0.2,0,0.3,0,0.5
		c-0.1,0.5-0.5,0.8-0.8,1.2c-2.7,2.7-5.4,5.4-8.1,8.1c-0.4,0.4-0.9,0.6-1.6,0.4c-0.2-0.1-0.4-0.2-0.6-0.4c-2.8-2.8-5.7-5.7-8.5-8.5
		C0.2,6.5,0.1,6.3,0,6C0,5.8,0,5.6,0,5.4z"
          />
        </g>
      </svg>
    </div>
  )
);