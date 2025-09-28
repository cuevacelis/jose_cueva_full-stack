import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}