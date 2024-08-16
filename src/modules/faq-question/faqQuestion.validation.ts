import { z } from "zod";

const create = z.object({
  body: z
    .object({
      question: z.string({
        required_error: "Question is required",
        invalid_type_error: "Question must be a string",
      }),
      answer: z.string({
        required_error: "Answer is required",
        invalid_type_error: "Answer must be a string",
      }),
    })
    .strict(),
});

export const faqQuestionValidation = {
  create,
};
