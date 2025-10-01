# Metrology API

## 1. Entities

1. Address

```typescript
type Address = {
  id: string;
  address: string;
}
```

Relations: 
- `Clinic`

2. Clinic

```typescript
type Clinic = {
  id: string;
  name: string;
  contacts: Contact[]
}
```

```typescript
type Contact = {
  name: string;
  email: string;
  tel: string;
}
```

Relations:
- `Category`

3. Category 

```typescript
type Category = {
  id: string;
  name: string;
}
```

Relations:
- `Clinic`
- `Instrument`

4. Instrument

```typescript

type Instrument = {
  id: string;
  serialNumber: string;
  verificatedAt: number;
  validUntil: number;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  updatedBy: string;
  status: Status;
  comment: string;
}
```

```typescript
enum Status {
  VALID,
  PREPARE_TO_VALIDATION,
  IN_VALIDATION,
  LOST,
  INVALID,
  CANCELED
}
```

Relations: 
- `Clinic`
- `Vendor`
- `Model`

5. Vendor 

```typescript
type Vendor = {
  id: string;
  name: string;
}
```

Relations: 
- `Model`

6. Model 

```typescript
type Model = {
  id: string;
  name: string;
  regisryNumber: string;
  registryName: string;
  validationPrice: number;
}
```

Relations: 
- `Model`

7. Engineer 

```typescript
type Engineer = {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  role: Role
}
```

```typescript
enum Role {
  SUPERUSER,
  ADMIN,
  ENGINEER
}
```

8. Validation History

```typescript
type ValidationHistory = {
  accountNum: string;
  date: number;
  instrumentIds: string[];
}
```

Relations: 
- `Category`

9. Note

```typescript
type Note = {
  id: string;
  name: string;
  description: string;
}
```

