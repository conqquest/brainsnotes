interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  type?: string;
}

export function Input({ placeholder, reference, type = "text" }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        placeholder={placeholder}
        type={type}
        className="
          w-full px-4 py-3
          bg-white/90
          border border-amber-900/15
          rounded-2xl
          text-[#111111]
          placeholder-slate-400
          font-medium
          text-sm
          transition-all duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-[#635BFF]/40
          focus:border-[#635BFF]
          shadow-sm
        "
      />
    </div>
  );
}
