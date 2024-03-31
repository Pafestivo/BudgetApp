# Routes:

### Transactions:

> #### Get
>
> > **api/transactions?page=number&limit=number** - Get paginated transactions<br> **api/transactions/expenses?page=number&limit=number** - Get paginated expenses<br> **api/transactions/incomes?page=number&limit=number** - Get paginated incomes<br>
>
> #### PUT:
>
> #### Post:
>
> #### Delete:

# Utilities:

### getPaginationMetadata()

> ```ts
> getPaginationMetadata(page: number, limit: number, tableName: string, condition?: string)
> ```
>
> ##### Description
>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get the pagination metadata.
>
> ##### Parameters
>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**page** - Requested page number.<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**limit** - Amount of entries per page.<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**tableName** - The name of the table in the DB to count.<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**condition(optional)** - specify a condition for example `type = 'income'`<br>
>
> ##### Returns
>
> ```ts
> {
>  currentPage: number,
>  totalPages: number,
>  totalCount: number,
>  itemsPerPage: number
> }
> ```
