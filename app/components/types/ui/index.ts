import { TextFieldProps } from "@mui/material/TextField";
import { JSX } from "react";

export type TextFieldType = TextFieldProps & {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface ContainerType {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export interface ButtonType {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonPrimayType {
  children: React.ReactNode;
}
