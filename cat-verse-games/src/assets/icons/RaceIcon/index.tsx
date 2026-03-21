const RaceIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="22" x2="4" y2="4" />
    <path d="M4 15c.5 0 2-1 2-1.5V6s-1.5.5-2 .5" />
    <path d="M4 4.5c4 0 4 2 8 2s4-2 8-2V12c-4 0-4 2-8 2s-4-2-8-2" />
    <line x1="12" y1="6" x2="12" y2="14" />
  </svg>
);

export default RaceIcon;
