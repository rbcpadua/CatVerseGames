export const Button = ({ children, ...props }: any) => (
  <button
    {...props}
    className="btn btn-primary bg-catPurple border-none text-white"
  >
    {children}
  </button>
);
