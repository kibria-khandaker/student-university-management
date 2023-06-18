import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = { calculatePagination }

// http://localhost:5000/api/v1/academic-semester/?page=1&limit=10
// {{USM}}/academic-semester/?sortBy=year&sortOrder=desc
// {{USM}}/academic-semester/?sortBy=code&sortOrder=asc
// {{USM}}/academic-semester/?sortBy=code&sortOrder=desc
// {{USM}}/academic-semester/?sortBy=year&sortOrder=asc
