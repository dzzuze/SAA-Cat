interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const ButtonLoading = ({
  loading,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      disabled={loading || props.disabled}
      className={`w-full bg-main-yellow hover:bg-main-yellow text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98] disabled:opacity-70 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default ButtonLoading;
