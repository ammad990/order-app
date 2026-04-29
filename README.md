# A basic order app

## Tech Stack

Backend: NestJS (Node.js + TypeScript)  
Frontend: React (Create React App)  
Storage: In-memory data store  


## Project setup - Backend

```bash
cd backend  
$ npm install  
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

## Project setup - Frontend
```bash
npm install  
npm start  
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
- UI and backend structure refinement
