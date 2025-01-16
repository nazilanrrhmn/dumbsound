import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="border-border-primary bg-background-teritery h-12 w-full rounded-lg border-[1px] p-5"
        {...props}
      />
    );
  }
);

export default FormInput;
