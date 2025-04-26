import React from "react";
import { useFormContext, Controller } from "react-hook-form";

export function Form({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{children}</form>;
}

export function FormField({ name, render }: { name: string; render: (field: any) => React.ReactNode }) {
  const { control } = useFormContext();
  return <Controller name={name} control={control} render={render} />;
}

export function FormItem({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function FormLabel({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props}>{children}</label>;
}

export function FormControl({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function FormMessage({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="form-message">{children}</div>;
}

export function FormDescription({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className="form-description">{children}</div>;
}
