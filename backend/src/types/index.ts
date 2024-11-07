export interface IFile {
  fileName: string;
  originalName: string;
}

export interface IProduct {
  title: string;
  image: IFile;
  category: string
  description: string;
  price: number | null;
}

export enum PaymentType {
  Card = 'card',
  Online = 'online',
}

export interface IOrder {
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
