"use client";

import { ReactNode } from "react";

import { Input, type InputProps } from "@/components/ui/input";

type InputWithIconProps = InputProps & {
  label: string;
  icon: ReactNode;
  error?: string;
  trailingAction?: ReactNode;
};

export function InputWithIcon({
  label,
  icon,
  error,
  trailingAction,
  ...props
}: InputWithIconProps) {
  return (
    <div className="space-y-1.5 text-left text-sm font-medium">
      <label htmlFor={props.id}>{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input
          {...props}
          className={`h-12 rounded-xl border-border bg-secondary/40 pl-11 ${props.className ?? ""}`}
        />
        {trailingAction}
      </div>
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
