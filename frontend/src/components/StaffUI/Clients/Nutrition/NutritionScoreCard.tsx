import {

    CircularProgress,

    CircularProgressLabel,

    Heading,

    HStack,

    VStack,

    Text,

    Badge,

    SimpleGrid,

    Progress

} from "@chakra-ui/react";

import AppleCard from "../../../Shared/Apple/AppleCard";

interface Breakdown {

    calories:number;

    protein:number;

    fiber:number;

    consistency:number;

    balance:number;

}

interface Props{

    score:number;

    grade:string;

    status:string;

    breakdown:Breakdown;

}

const NutritionScoreCard = ({

    score,

    grade,

    status,

    breakdown

}:Props)=>{

    const color=

        score>=80

            ?"green"

            :score>=60

            ?"orange"

            :"red";

    return(

        <AppleCard>

            <HStack

                spacing={10}

                align="center"

                flexWrap="wrap"

            >

                <CircularProgress

                    value={score}

                    size="160px"

                    thickness="10px"

                    color={`${color}.400`}

                >

                    <CircularProgressLabel>

                        <VStack spacing={0}>

                            <Heading size="lg">

                                {score}

                            </Heading>

                            <Text
                                fontSize="xs"
                                color="gray.500"
                            >

                                /100

                            </Text>

                        </VStack>

                    </CircularProgressLabel>

                </CircularProgress>

                <VStack

                    align="start"

                    flex={1}

                    spacing={4}

                >

                    <Heading size="md">

                        Nutrition Score

                    </Heading>

                    <Badge

                        colorScheme={color}

                        borderRadius="full"

                        px={4}

                        py={1}

                        fontSize="sm"

                    >

                        {grade} • {status}

                    </Badge>

                    <SimpleGrid

                        columns={2}

                        spacing={4}

                        w="100%"

                    >

                        <ScoreItem

                            title="Calories"

                            value={breakdown.calories}

                            max={30}

                        />

                        <ScoreItem

                            title="Protein"

                            value={breakdown.protein}

                            max={30}

                        />

                        <ScoreItem

                            title="Fiber"

                            value={breakdown.fiber}

                            max={10}

                        />

                        <ScoreItem

                            title="Consistency"

                            value={breakdown.consistency}

                            max={20}

                        />

                        <ScoreItem

                            title="Balance"

                            value={breakdown.balance}

                            max={10}

                        />

                    </SimpleGrid>

                </VStack>

            </HStack>

        </AppleCard>

    );

};

interface ItemProps{

    title:string;

    value:number;

    max:number;

}

const ScoreItem=({

    title,

    value,

    max

}:ItemProps)=>{

    return(

        <VStack

            align="stretch"

            spacing={2}

        >

            <HStack

                justify="space-between"

            >

                <Text
                    fontSize="sm"
                    color="gray.600"
                >

                    {title}

                </Text>

                <Text
                    fontWeight="bold"
                >

                    {value}/{max}

                </Text>

            </HStack>

            <Progress

                value={(value/max)*100}

                borderRadius="full"

                size="sm"

                colorScheme="blue"

            />

        </VStack>

    );

};

export default NutritionScoreCard;