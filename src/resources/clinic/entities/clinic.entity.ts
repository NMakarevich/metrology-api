export class Clinic {
  id: string;
  name: string;
  contacts: Contact[];
  addressId: string;
}

export interface Contact {
  fullName: string;
  phone?: string;
  email?: string;
}
