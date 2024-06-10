export type Category = {
  strCategory: string;
};

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type SearchForm = {
  search: string;
};

// atajo (no utilizar en produccion)
export type MealDetails = {
  [key: string]: string;
};
