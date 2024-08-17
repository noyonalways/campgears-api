import { model, Schema } from "mongoose";
import { IFaqQuestion } from "./faqQuestion.interface";

const faqQuestionSchema = new Schema<IFaqQuestion>(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      unique: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    timestamps: true,
  },
);

const FaqQuestion = model<IFaqQuestion>("Faq-Question", faqQuestionSchema);
export default FaqQuestion;
