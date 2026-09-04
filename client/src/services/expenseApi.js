import api from "./api";

export const getExpenses =
  () =>
    api.get("/expenses");

export const addExpense =
  data =>
    api.post(
      "/expenses",
      data
    );