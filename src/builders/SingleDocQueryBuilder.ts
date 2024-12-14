import { Document, Model } from "mongoose";

// The builder class is now generic and reusable for any Mongoose model
class SingleDocQueryBuilder<T extends Document> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private query: any; // Mongoose query
  private populateOptions: string[] = [];

  constructor(
    private model: Model<T>,
    private filter: Record<string, unknown>, // Dynamic filter
    private options: Record<string, unknown>, // Query options
  ) {
    this.query = this.model.findOne(filter); // Initialize with findById for the given model
  }

  // Set fields to select, accepting an array of fields
  selectFields(defaultFields?: string[]) {
    const fieldsToSelect = this.options.expand
      ? "" // If 'expand' is true, select all fields
      : this.options.fields
        ? (this.options.fields as string).split(",").join(" ") // Select specified fields
        : defaultFields && defaultFields.join(" "); // Default fields if no 'fields' or 'expand'

    this.query = this.query.select(fieldsToSelect);
    return this;
  }

  // Add populate for specific fields, accepts multiple fields
  populate(fields: string[]) {
    if (this.options.expand === false) {
      // If 'expand' is explicitly false, do not populate any fields
      this.populateOptions = [];
    } else if (this.options.fields) {
      const requestedFields = (this.options.fields as string).split(",");
      this.populateOptions = fields.filter((field) =>
        requestedFields.includes(field),
      );
    } else {
      this.populateOptions = fields; // Expand will populate all requested fields if 'expand' is true
    }
    return this;
  }

  // Execute the query
  async execute(): Promise<T | null> {
    if (this.options.expand === "false") {
      // If 'expand' is explicitly false, do not populate any fields
      this.populateOptions = [];
    }

    // Populate if necessary
    if (this.populateOptions.length > 0) {
      this.populateOptions.forEach((field) => {
        this.query = this.query.populate(field); // Apply population to each field
      });
    }
    return this.query.exec();
  }
}

export default SingleDocQueryBuilder;
