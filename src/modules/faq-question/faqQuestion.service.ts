import QueryBuilder from "mongoose-dynamic-querybuilder";
import { IFaqQuestion } from "./faqQuestion.interface";
import FaqQuestion from "./faqQuestion.model";

// create a new faq question
const create = (payload: IFaqQuestion) => {
  return FaqQuestion.create(payload);
};

// get all faq questions
const getAll = (query: Record<string, unknown>) => {
  const faqQuestionQuery = new QueryBuilder(FaqQuestion.find({}), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  return faqQuestionQuery.modelQuery;
};

export const faqQuestionService = {
  create,
  getAll,
};
