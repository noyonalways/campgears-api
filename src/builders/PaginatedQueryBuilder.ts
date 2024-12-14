import {
  IPaginatedResponse,
  IPagination,
  IQueryOptions,
} from "../interface/builder.interface";

class PaginatedQueryBuilder<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private query: any;
  private options: IQueryOptions;
  private pagination: IPagination;
  private baseUrl: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(query: any, options: IQueryOptions, baseUrl: string) {
    this.query = query;
    this.options = options;
    this.pagination = {
      page: Number(options.page) || 1,
      limit: Number(options.limit) || 10,
      totalPage: 1,
      total: 0,
      nextPage: null,
      prevPage: null,
    };
    this.baseUrl = baseUrl;
  }

  // Apply filtering
  filter() {
    const queryObj: Record<string, unknown> = { ...this.options };

    // Define the fields to exclude from the filter
    const excludeFields = [
      "search",
      "sort",
      "limit",
      "page",
      "fields",
      "sortBy",
      "sortType",
    ];

    excludeFields.forEach((el) => delete queryObj[el]);
    this.query = this.query.find(queryObj);
    return this;
  }

  // Apply search
  search(searchFields: string[] = ["title", "brief", "content"]) {
    if (this.options.search) {
      const regex = new RegExp(this.options.search, "i"); // Case-insensitive regex
      const searchConditions = searchFields.map((field) => ({
        [field]: regex,
      }));
      this.query = this.query.find({ $or: searchConditions });
    }
    return this;
  }

  // Apply sorting
  sort() {
    const sortBy = this.options.sortBy || "updatedAt";
    const sortType = this.options.sortType === "asc" ? 1 : -1;
    this.query = this.query.sort({ [sortBy]: sortType });
    return this;
  }

  // Apply field selection
  selectFields(defaultFields?: string[]) {
    // If specific fields are provided in the query options, use them
    if (this.options.fields) {
      const fields = this.options.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }
    // If defaultFields are passed as an argument, use them
    else if (defaultFields && defaultFields.length > 0) {
      const fields = defaultFields.join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }

  // Dynamically apply populate based on fields
  populateFields(populatableFields: string[]) {
    if (this.options.fields) {
      // Populate only the specified fields
      const requestedFields = this.options.fields.split(",");
      populatableFields.forEach((field) => {
        if (requestedFields.includes(field)) {
          this.query = this.query.populate(field);
        }
      });
    } else {
      // Populate all fields by default
      populatableFields.forEach((field) => {
        this.query = this.query.populate(field);
      });
    }
    return this;
  }

  // Apply pagination
  paginate() {
    const skip = (this.pagination.page - 1) * this.pagination.limit;
    this.query = this.query.skip(skip).limit(this.pagination.limit);
    return this;
  }

  // Build query string from options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildQueryString(params: Record<string, any>): string {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }

  // Execute the query and include pagination metadata
  async execute(): Promise<IPaginatedResponse<T>> {
    // console.log("Executing QueryBuilder...");

    // Debugging inputs
    // console.log("Base URL:", this.baseUrl);
    // console.log("Pagination:", this.pagination);
    // console.log("Options:", this.options);

    const isDeletedFilter = { isDeleted: false };

    // Merge the `isDeleted` filter with the existing query conditions
    const countQuery = { ...this.query.getQuery(), ...isDeletedFilter };

    const [data, total] = await Promise.all([
      this.query.exec(),
      this.query.model.countDocuments(countQuery),
    ]);

    const totalPage = Math.ceil(total / this.pagination.limit);
    const nextPage =
      this.pagination.page < totalPage
        ? `${this.baseUrl}?${this.buildQueryString({
            ...this.options,
            page: Number(this.pagination.page) + 1, // Increment page correctly
          })}`
        : null;
    const prevPage =
      this.pagination.page > 1
        ? `${this.baseUrl}?${this.buildQueryString({
            ...this.options,
            page: Number(this.pagination.page) - 1,
          })}`
        : null;

    // Set the pagination data
    this.pagination = {
      ...this.pagination,
      totalPage,
      total,
      nextPage,
      prevPage,
    };

    // console.log("Next Page URL:", nextPage);
    // console.log("Previous Page URL:", prevPage);

    return {
      data,
      pagination: this.pagination,
    };
  }
}

export default PaginatedQueryBuilder;
