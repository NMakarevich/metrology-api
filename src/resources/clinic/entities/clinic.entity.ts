export class Clinic {
  id: string;
  name: string;
  contacts: Contact[];
  addressId: string;
  categoryIds: string[];
}

export interface Contact {
  fullName: string;
  role: string;
  phone?: string;
  email?: string;
}
