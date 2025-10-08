## Endpoints

[Go to README](../README.md)

1. `/`

- `GET` - should return all data separated by category and clinic of instrument

```
category1
  └── clinic1
      ├── instrument1
      └── instrument2
  └── clinic2
      ├── instrument1
      └── instrument2
category2
    ...
```

2. `/address`

- `GET` - should return all addresses
- `GET /:id` - should return address by id
- `POST` - should create new address
- `PATCH /:id` - should update address

3. `/clinic`

- `GET` - should return list of all clinics with presented categories
- `GET /:id` - should return clinic by id with presented categories
- `POST` - should create new clinic
- `PATCH /:id` - should update clinic's fields

4. `/clinic/:clinicId/category`

- `GET` - should return list of all categories for clinicId
- `GET /:id` - should return category by id
- `POST` - create new category
- `PATCH /:id` - update category's fields

5. `/clinic/:clinicId/category/:categoryId/instrument`

- `GET` - should return list of all instruments for clinicId and categoryId
- `GET /:id` - should return card for instrument
- `POST` - should create new instrument
- `PATCH /:id` - should update instrument

6. `/clinic/:clinicId/category/:categoryId/vendor`

- `GET` - should return list of vendors for this category included list of models
- `GET /:id` - should return vendor by id included list of models
- `POST` - should create new vendor
- `PATCH /:id` - should update vendor info

7. `/vendor/:vendorId/model`

- `GET` - should return list of models for vendorId
- `GET /:id` - should return model by id
- `POST` - should create new model
- `PATCH /:id` - should update info about model

8. `/verification` 

- `GET` - should return list of all verifications sorted by date
- `GET /:id` - should return verification data by id
- `POST` - should create new verification
- `PATCH /:id` - should update verification

9. `/notes`

- `GET` - should return list of all notes
- `GET /:id` - should return note by id
- `POST` - should create new note
- `PATCH /:id` - should update note

10. `/planning`
10. `/engineer`

- `GET` - should return list of all engineers (only for SUPERUSER and ADMIN)
- `GET /:id` - should return engineer by id (for authorized user)
- `POST` - should create new engineer (if it's first - set SUPERUSER, for another - ENGINEER)
- `PATCH /:id` - should update engineer (according role)
11. `/planning`

Possible feature