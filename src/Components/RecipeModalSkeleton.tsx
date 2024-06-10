import { Container, SkeletonText } from "@chakra-ui/react";

type Props = {};

function RecipeModalSkeleton({}: Props) {
  return (
    <Container>
      <SkeletonText mt={4} mb={5} noOfLines={1} skeletonHeight={8} />
      <SkeletonText borderRadius={200} noOfLines={1} skeletonHeight={280} />
      <SkeletonText mt={4} noOfLines={5} spacing={4} />
    </Container>
  );
}

export default RecipeModalSkeleton;
