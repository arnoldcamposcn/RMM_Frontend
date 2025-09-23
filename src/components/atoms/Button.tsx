type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full px-4 py-3 bg-azul-codea text-white rounded-lg hover:bg-azul-codea/80 transition font-semibold text-sm"
    >
      {children}
    </button>
  );
}