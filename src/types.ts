export interface IUserForm {
  email: string;
  password: string;
}

export interface ISellerForm extends IUserForm {
  restoName: string;
  address: string;
  minPrice: string;
  maxPrice: string;
  speciality: string | null;
  restoPhoto: any;
}

export interface IResto {
  id: number;
  nom_restaurant: string;
  adress: string;
  prix: string;
  speciality: string;
  image: string;
}

export interface IComment {
  id: number;
  comment: string;
  created_at: string;
  email: string;
}

export interface IToken {
  id: number;
  email: string;
  role: string;
  csrf: string;
}

export type ISession = IToken & { connected: boolean };
