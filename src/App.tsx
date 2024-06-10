import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import MainContent from "./Components/MainContent";
import { useState } from "react";
import { Category, Meal, MealDetails, SearchForm } from "./Components/types";
import useHttpData from "./Components/hooks/useHttpData";
import axios from "axios";
import RecipeModal from "./Components/RecipeModal";
import useFetch from "./Components/hooks/useFetch";

const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const url = `${baseUrl}list.php?c=list`;

const makeMealUrl = (category: Category) =>
  `${baseUrl}filter.php?c=${category.strCategory}`;

const defualtCategory = {
  strCategory: "Beef",
};

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState<Category>({
    strCategory: "Beef",
  });

  const { loading, data } = useHttpData<Category>(url);

  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setMeals,
    setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(defualtCategory));

  const searchApi = (searchForm: SearchForm) => {
    const url = `${baseUrl}search.php?s=${searchForm.search}`;
    setLoadingMeal(true);
    axios
      .get<{ meals: Meal[] }>(url)
      .then(({ data }) => setMeals(data.meals))
      .finally(() => setLoadingMeal(false));
  };

  const { fetch, loading: loadingMealDetails, data: melaDetailData } = useFetch<MealDetails>();

  const searchMealDetails = (meal: Meal) => {
    onOpen();
    fetch(`${baseUrl}lookup.php?i=${meal.idMeal}`);
  };
  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "nav main"`}
        gridTemplateRows={"60px 1fr"}
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
        fontSize={14}
      >
        <GridItem
          boxShadow="lg"
          zIndex={1}
          pos="sticky"
          top={0}
          pt={2}
          bg="white"
          area={"header"}
        >
          <Header onSubmit={searchApi}></Header>
        </GridItem>
        <GridItem
          overflowY={"auto"}
          position="sticky"
          top="60px"
          left="0"
          padding={5}
          area={"nav"}
          height="calc(100vh - 60px)"
        >
          <SideNav
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={data}
            loading={loading}
          ></SideNav>
        </GridItem>
        <GridItem padding={4} bg="gray.100" area={"main"}>
          <MainContent
            openRecipe={searchMealDetails}
            meals={dataMeal}
            loading={loadingMeal}
          ></MainContent>
        </GridItem>
      </Grid>
      <RecipeModal
        data={melaDetailData}
        loading={loadingMealDetails}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default App;
