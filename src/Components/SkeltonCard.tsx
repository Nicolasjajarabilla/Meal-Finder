import { Card, CardBody, SkeletonText } from "@chakra-ui/react";

type Props = {};

function SkeltonCard({}: Props) {
  return (
    <Card boxShadow="lg">
      <CardBody>
        <SkeletonText mt="1" noOfLines={1} spacing="4" skeletonHeight="220" />
        <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="2" />
      </CardBody>
    </Card>
  );
}

export default SkeltonCard;
