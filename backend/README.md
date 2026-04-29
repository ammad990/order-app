## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# watch mode
$ npm run start:dev
Runs on: http://localhost:3000
```

## API Endpoints


### GET Requests

GET /menu  
GET /student  
GET /parent  

### Create Order

POST /orders
```bash
Request:
{
  "studentId": 1,
  "items": [
    { "menuItemId": 1, "quantity": 2 }
  ]
}


Response:
{
  "success": true,
  "order": {},
  "balance": 30
}

```

## Business Rules

1. Reject order if wallet balance is insufficient
2. Reject if any item contains allergens matching student allergens
3. Reject if any item is unavailable
4. On success:
   - Calculate total
   - Deduct wallet balance
   - Save order

## Assumptions
- Data is seeded on application start

## AI Tools Used
Gemini/ChatGPT
- Code refactoring suggestions
- Naming conventions
- backend structure refinement

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
