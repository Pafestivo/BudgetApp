# Routes:

### Transactions:

- #### Get

  - **api/transactions** - Get paginated transactions
    - Request Query:
      - page: number
      - limit: number
  - **api/transactions/expenses** - Get paginated expenses
    - Request Query:
      - page: number
      - limit: number
  - **api/transactions/incomes** - Get paginated incomes
    - Request Query:
      - page: number
      - limit: number
  - **api/transactions/:id** - Get single transaction
    - Request Params:
      - id: number

- #### PUT:

  - **api/transactions** - Update transaction
    - Request Body:
      - id: number
      - name: string
      - amount: number
      - date: string

- #### POST:

  - **api/transactions** - Post new transaction
    - Request Body:
      - name: string
      - amount: number
      - date: string

- #### DELETE:

  - **api/transactions/:id** - Delete transaction
    - Request Params:
      - id: number

### userSummary:

- #### Get

  - **api/user/currentBalance** - get the user's current balance
    - Not taking any params
  - **api/user/monthlyIncomes/:requestedMonth** - get total monthly incomes for user
    - Request Params:
      - requestedMonth(number between 1-12)
  - **api/user/monthlyExpenses/:requestedMonth** - get total monthly expenses for user
    - Request Params:
      - requestedMonth(number between 1-12)

# Utilities:

### getPaginationMetadata()

- ##### Get Pagination Metadata.
- ##### Parameters
  - **page: number -** Requested page number.
  - **limit: number -** Amount of entries per page.
  - **tableName: string -** The name of the DB table to count.
  - **condition: string -** Specify a filter to count by.(optional) - i.e `type = 'income'`
- ##### Returns
  ```ts
    {
      currentPage: number,
      totalPages: number,
      totalCount: number,
      itemsPerPage: number
    }
  ```
