export type ILogin = {
  email: string;
  password: string;
};
export type IRegister = {
  email: string;
  password: string;
  name: string;
};
export type ITask = {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
};
