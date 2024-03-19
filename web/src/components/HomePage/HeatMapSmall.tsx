import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { valueToColor } from "../../utils/colors";

const HeatMapSmall = ({ rates, size }: { rates: number[]; size?: string }) => {
  const generateCell = (index: number) => (
    <Box key={index}>
      <Box
        height={size ?? "4px"}
        width={size ?? "4px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor={"pointer"}
        bg={valueToColor(rates[index], rates)}
      />
    </Box>
  );

  return (
    <Flex direction={"column"} alignItems={"center"} gap={"10px"} minH={{ base: "", lg: "150px" }}>
      <Grid
        templateColumns="repeat(5, 1fr)"
        w={"fit-content"}
        border={size === "10px" ? "1px solid #262019" : "2px solid #262019"}
      >
        {Array.from({ length: 25 }).map((_, i) => generateCell(i))}
      </Grid>
    </Flex>
  );
};

export default HeatMapSmall;
