import { PackageType } from '../enums';

export interface Package {
  name: string;
  value: PackageType;
  width: number;
  height: number;
}

export interface MenuItem {
  label: string;
  icon: string;
  command?: () => void;
  to?: string;
  class?: string;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
}