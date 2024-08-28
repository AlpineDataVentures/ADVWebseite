export type Values = {
  title: string;
  image: string;
  content: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Task =
  {
    title: string;
    icon: string;
    description: string;
  }

export type SubSection = {
  title: string;
  description: string;
  tasks: Task[];
}

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
