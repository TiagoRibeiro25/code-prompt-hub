import { Schema, Validator } from "jsonschema";

type Result = {
  isValid: boolean;
  error: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function validateSchema(schema: Schema, data: any): Result {
  const validator = new Validator();
  const result = validator.validate(data, schema);

  if (result.errors.length === 0) {
    return { isValid: true, error: "" };
  }

  return {
    isValid: false,
    error: result.errors.map((error) => error.stack).join(", "),
  };
}

// Example usage
// schema: { type: "object", properties: { name: { type: "string" } } }
// data: { name: "John" }
