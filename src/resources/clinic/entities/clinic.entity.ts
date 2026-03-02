import { Contact } from '../../contact/entities/contact.entity';

export class Clinic {
  id: string;
  name: string;
  contacts: Contact[];
  addressId: string;
  categoryIds: string[];
}
