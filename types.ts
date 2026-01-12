
export enum ProjectCategory {
  EDUCATION = 'Education',
  RELIEF = 'Relief',
  MOSQUE = 'Mosque',
  DAWAH = 'Dawah',
  ORPHAN = 'Orphan'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  raised: number;
  goal: number;
}

export interface Member {
  id: string;
  name: string;
  designation: string;
  image: string;
  phone?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export type ViewState = 'public' | 'admin';
