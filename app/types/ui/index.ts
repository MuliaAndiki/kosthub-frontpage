import { SelectChangeEvent } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { JSX } from "react";

export type TextFieldType = TextFieldProps & {
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface ContainerType extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
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

export interface ButtonPopUpType {
  children: React.ReactNode;
  message: "secondary" | "success" | "error";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SelectType {
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonUploadsType {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  accept?: string;
  children: React.ReactNode;
}

export type TextareaType = TextFieldProps & {
  label: string;
  placeholder: string;
  value: string;
};

export interface RatingPrimaryType {
  name: string;
  onChange: (event: React.SyntheticEvent, value: number | null) => void;
  onChangeActive: (event: React.SyntheticEvent, value: number) => void;
}

export interface PulseType {
  className: string;
}
