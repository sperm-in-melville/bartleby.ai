import * as React from "react"

interface EmptyChairIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function EmptyChairIcon({ className, ...props }: EmptyChairIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Chair base with 5 wheels */}
      <circle cx="12" cy="20.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="18.5" r="0.5" fill="currentColor" />
      <circle cx="15.5" cy="18.5" r="0.5" fill="currentColor" />
      <circle cx="9.5" cy="21.5" r="0.5" fill="currentColor" />
      <circle cx="14.5" cy="21.5" r="0.5" fill="currentColor" />
      
      {/* Central post */}
      <line x1="12" y1="20" x2="12" y2="15.5" strokeWidth="1.5" />
      
      {/* Seat - clean rectangle, slightly angled */}
      <path 
        d="M7 15.5 L17 15 C17.3 15 17.5 14.7 17.5 14.4 L17.3 13.1 C17.3 12.8 17 12.5 16.7 12.5 L7.3 13 C7 13 6.7 13.3 6.7 13.6 L6.9 14.9 C6.9 15.2 7.2 15.5 7.5 15.5 Z"
        fill="none"
        strokeWidth="1.5"
      />
      
      {/* Backrest - clean, angled away from viewer */}
      <path 
        d="M7.2 13 L7 7.5 C7 7.2 7.2 7 7.5 7 L16.5 6.8 C16.8 6.8 17 7 17 7.3 L17.2 12.8"
        fill="none"
        strokeWidth="1.5"
      />
      
      {/* Left armrest */}
      <path 
        d="M7 14 L5.5 14.1 C5.2 14.1 5 13.9 5 13.6 L5.1 11.5 C5.1 11.2 5.3 11 5.6 11 L6.9 10.9"
        fill="none"
        strokeWidth="1.5"
      />
      
      {/* Right armrest */}
      <path 
        d="M17.1 13.5 L18.5 13.4 C18.8 13.4 19 13.2 19 12.9 L18.9 11 C18.9 10.7 18.7 10.5 18.4 10.5 L17.1 10.6"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  )
} 