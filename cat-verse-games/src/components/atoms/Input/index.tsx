interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => (
  <div className="form-control w-full">
    <label className="label">
      <span className="label-text font-bold text-base-content">{label}</span>
    </label>
    <input
      {...props}
      className="input input-bordered w-full bg-base-100 text-base-content focus:input-primary transition-all"
    />
  </div>
);
