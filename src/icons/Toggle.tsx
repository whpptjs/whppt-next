import React, { FC } from 'react';
export const ToggleWhpptIcon: FC<{ active: boolean }> = ({ active }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38.5"
      height="29"
      viewBox="0 0 38.5 35"
    >
      <defs>
        <filter
          id="Rectangle"
          x="0"
          y="0"
          width="29"
          height="29"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feFlood floodOpacity="0.2" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="Rectangle-2"
          x="3"
          y="3.5"
          width="23"
          height="23.5"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="0.5" result="blur-2" />
          <feFlood floodOpacity="0.122" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="Rectangle-3"
          x="3"
          y="3"
          width="23"
          height="23"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" result="blur-3" />
          <feFlood floodOpacity="0.141" />
          <feComposite operator="in" in2="blur-3" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="Rectangle-4"
          x="0"
          y="0"
          width="29"
          height="29"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" result="blur-4" />
          <feFlood floodOpacity="0.2" />
          <feComposite operator="in" in2="blur-4" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="Rectangle-5"
          x="3"
          y="3.5"
          width="23"
          height="23.5"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="0.5" result="blur-5" />
          <feFlood floodOpacity="0.122" />
          <feComposite operator="in" in2="blur-5" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="Rectangle-6"
          x="3"
          y="3"
          width="23"
          height="23"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" result="blur-6" />
          <feFlood floodOpacity="0.141" />
          <feComposite operator="in" in2="blur-6" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g
        id="Dark_Selection_Controls_3._Switch_2_States_"
        data-name="Dark 🌑 / Selection Controls/3. Switch/ (2 States)"
        transform="translate(4.5 3.5)"
      >
        <rect
          id="_Color_l_Track"
          data-name="🎨 Color l Track"
          width="34"
          height="14"
          rx="7"
          transform="translate(0 3)"
          fill="#3b86ff"
        />
        <g
          id="Shadow"
          className={`toggleMove ${active ? 'toggleMove--active' : ''}`}
        >
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle)"
          >
            <rect
              id="Rectangle-7"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#fff"
            />
          </g>
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle-2)"
          >
            <rect
              id="Rectangle-8"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#fff"
            />
          </g>
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle-3)"
          >
            <rect
              id="Rectangle-9"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#fff"
            />
          </g>
        </g>
        <g
          id="Shadow-2"
          className={`toggleMove ${active ? 'toggleMove--active' : ''}`}
          data-name="Shadow"
        >
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle-4)"
          >
            <rect
              id="Rectangle-10"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#121212"
            />
          </g>
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle-5)"
          >
            <rect
              id="Rectangle-11"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#121212"
            />
          </g>
          <g
            transform="matrix(1, 0, 0, 1, -4.5, -3.5)"
            filter="url(#Rectangle-6)"
          >
            <rect
              id="Rectangle-12"
              data-name="Rectangle"
              width="20"
              height="20"
              rx="10"
              transform="translate(4.5 3.5)"
              fill="#121212"
            />
          </g>
        </g>
        <circle
          id="_Color_l_Thumb"
          data-name="🎨 Color l Thumb"
          className={`toggleMove ${active ? 'toggleMove--active' : ''}`}
          cx="10"
          cy="10"
          r="10"
          fill="#d7e7ff"
        />
      </g>
    </svg>
  );
};
