interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const ButtonLoading = ({
  loading,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`w-full bg-yellow-400 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98] disabled:opacity-70 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default ButtonLoading;
