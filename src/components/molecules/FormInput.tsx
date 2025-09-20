// molecules/FormInput.tsx
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import { ErrorMessage } from "../atoms/ErrorMessage";
import type { FieldError } from "react-hook-form";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: FieldError;
};

export function FormInput({ label, name, type = "text", placeholder, register, error }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...register(name)} type={type} placeholder={placeholder} />
      <ErrorMessage message={error?.message} />
    </div>
  );
}
