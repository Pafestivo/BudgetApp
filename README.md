![Dashboard](/image-1.png)

![Transactions List](/image-2.png)

![Details Screen](/image-1.png)

## Technologies Used:

1. ReactJS
2. Redux
3. NodeJS
4. ExpressJS
5. MySQL

## Features

1. Read budget summary on the main dashboard page.
2. Toggle between light and dark mode through the toggle on the top right. Current mode will also be stored in localStorage to remember the user preference.
3. Full CRUD on transactions, can take negative or positive values as income/expense.
4. Filter to view incomes/expenses/all transaction.
5. Pagination to fetch on demand
6. Used redux to spare API calls:
   <br>Store fetched transactions while user browse through the pages
   <br>Store user summary and perform calculations on the front end upon adding, updating, or deleting a transaction.
7. Responsive design to be usable from mobile as well.

## Notes

- Documentation for the backend can be found in backend/documentation.md

## How to run the project

1. Clone the repo
2. Run `npm run build` in the root directory that contains both backend and frontend folders.
3. Create a new local MySQL database.
4. Import the structure file and then the data file from backend/db_dump.
5. Rename backend/.env.example to backend/.env and fill your local database credentials.
6. Rename frontend/.env.example to frontend/.env and make sure the port is correct(the default would be 3000)
7. Run `npm run start` to run the app.
