export type Account = {
  name: string;
  email: string;
  icon: any;
};

export type NavItem = {
  title: string;
  count: number;
  icon: any;
  variant: "default" | "ghost";
};

export type Mail = {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
};
