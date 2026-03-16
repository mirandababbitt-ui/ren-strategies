export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 800 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract background blobs */}
      <circle cx="200" cy="300" r="150" fill="hsl(var(--secondary))" fillOpacity="0.1" />
      <circle cx="600" cy="250" r="200" fill="hsl(var(--primary))" fillOpacity="0.05" />
      
      {/* Tangled mess (Left side) */}
      <path 
        d="M 50 300 C 100 100, 200 500, 150 300 C 100 100, 300 200, 250 400 C 200 600, 350 100, 300 300" 
        stroke="hsl(var(--foreground))" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-30"
      />
      <path 
        d="M 150 250 C 50 400, 300 500, 250 200 C 200 -50, 50 200, 150 350 C 250 500, 300 100, 200 250" 
        stroke="hsl(var(--foreground))" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-40"
      />
      
      {/* Transition to straight line (Middle to Right) */}
      <path 
        d="M 300 300 C 350 300, 400 300, 450 300 L 750 300" 
        stroke="hsl(var(--primary))" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Arrow head */}
      <path 
        d="M 720 270 L 750 300 L 720 330" 
        stroke="hsl(var(--primary))" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Waypoints on the straight path */}
      <circle cx="450" cy="300" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
      <circle cx="550" cy="300" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
      <circle cx="650" cy="300" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
      
      {/* Labels / text markers */}
      <text x="175" y="480" fontFamily="sans-serif" fontSize="14" fill="hsl(var(--foreground))" opacity="0.6" textAnchor="middle" letterSpacing="0.05em">CONFUSION</text>
      <text x="600" y="260" fontFamily="sans-serif" fontSize="14" fill="hsl(var(--primary))" fontWeight="600" textAnchor="middle" letterSpacing="0.1em">CONVERSION</text>
    </svg>
  );
}