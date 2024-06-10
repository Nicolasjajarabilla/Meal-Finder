import { SimpleGrid } from "@chakra-ui/react";
import { Meal } from "./types";
import MealCard from "./MealCard";
import SkeltonCard from "./SkeltonCard";

type Props = {
  meals: Meal[];
  loading: boolean;
  openRecipe: (meal: Meal) => void;
};

function MainContent({ loading, meals, openRecipe }: Props) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="20px">
      {loading && skeletons.map((skeleton) => <SkeltonCard key={skeleton} />)}
      {!loading &&
        meals.map((m) => 
        <MealCard openRecipe={() => openRecipe(m)} key={m.idMeal} meal={m}></MealCard>)}
    </SimpleGrid>
  );
}

export default MainContent;
