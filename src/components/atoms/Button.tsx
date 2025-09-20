type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}