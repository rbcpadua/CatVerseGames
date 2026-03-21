const MusicOffIcon = ({ size }: { size: number }) => (
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
    <path d="M9 9v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-5" />
    <path d="M12 3v5" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

export default MusicOffIcon;
