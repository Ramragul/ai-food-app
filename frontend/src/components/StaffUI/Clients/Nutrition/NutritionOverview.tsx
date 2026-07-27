import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Collapse,
    Badge,
    Box,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Progress,
    SimpleGrid,
    Spinner,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Skeleton,
    Text,
    VStack,    
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";

import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    FiActivity,
    FiTarget,
    FiTrendingUp,
    FiZap
} from "react-icons/fi";

import type { IconType } from "react-icons";

import AppleSection from "../../../Shared/Apple/AppleSection";
import NutritionScoreCard from "./NutritionScoreCard";

import {
    getNutritionIntelligence
} from "../../../../services/staff/client.service";

import type {
    NutritionIntelligence
} from "../../../../services/staff/client.types";
import AppleCard from "../../../Shared/Apple/AppleCard";

interface Props{

    memberId:number;

}

const NutritionOverview=({

    memberId

}:Props)=>{

    const [

        loading,

        setLoading

    ]=useState(true);

    const [

        nutrition,

        setNutrition

    ]=useState<NutritionIntelligence|null>(null);

    const [period, setPeriod] = useState<
    "today" | "week" | "month"
>("today");

const periodTitle = {

    today: "Today",

    week: "This Week",

    month: "This Month"

}[period];



useEffect(() => {
    loadNutrition(period);
}, [memberId, period]);

const loadNutrition = async (
    selectedPeriod: "today" | "week" | "month"
) => {

    try {

        setLoading(true);

        const response =
            await getNutritionIntelligence(
                memberId,
                selectedPeriod
            );

        setNutrition(response);

    } catch {

        toast({
            title: "Unable to load nutrition intelligence",
            status: "error"
        });

    } finally {

        setLoading(false);

    }

};

const displayNutrition =
    period === "today"
        ? nutrition?.summary
        : nutrition?.total;

const targetMultiplier =
    period === "today"
        ? 1
        : nutrition?.timeline?.length ?? 0;

const displayTargets = {

    calories: (nutrition?.targets?.calories ?? 0) * targetMultiplier,

    protein: (nutrition?.targets?.protein ?? 0) * targetMultiplier,

    carbs: (nutrition?.targets?.carbs ?? 0) * targetMultiplier,

    fats: (nutrition?.targets?.fats ?? 0) * targetMultiplier

};

// const displayRemaining = {

//     calories: Math.max(
//         0,
//         displayTargets?.calories - displayNutrition?.calories
//     ),

//     protein: Math.max(
//         0,
//         displayTargets?.protein - displayNutrition?.protein
//     ),

//     carbs: Math.max(
//         0,
//         displayTargets?.carbs - displayNutrition?.carbs
//     ),

//     fats: Math.max(
//         0,
//         displayTargets?.fats - displayNutrition?.fats
//     )

// };

const displayRemaining =
    period === "today"
        ? nutrition?.remaining!
        : {

            calories: Math.max(
                0,
                displayTargets?.calories - displayNutrition?.calories
            ),

            protein: Math.max(
                0,
                displayTargets?.protein - displayNutrition?.protein
            ),

            carbs: Math.max(
                0,
                displayTargets?.carbs - displayNutrition?.carbs
            ),

            fats: Math.max(
                0,
                displayTargets?.fats - displayNutrition?.fats
            )

        };


        console.log("Period:", period);

console.log("Display Nutrition:", displayNutrition);

console.log("Display Targets:", displayTargets);

console.log("Display Remaining:", displayRemaining);

console.log("Timeline Length:", nutrition?.timeline?.length);

console.log("Backend Targets:", nutrition?.targets);

    const completion=useMemo(()=>{

        if(!nutrition)

            return{

                calories:0,

                protein:0,

                carbs:0,

                fats:0

            };

        return{

            calories:Math.min(

                100,

                (displayNutrition.calories/

                displayTargets.calories)*100

            ),

            protein:Math.min(

                100,

                (displayNutrition.protein/

                displayTargets.protein)*100

            ),

            carbs:Math.min(

                100,

                (displayNutrition.carbs/

                displayTargets.carbs)*100

            ),

            fats:Math.min(

                100,

                (displayNutrition.fats/

                displayTargets.fats)*100

            )

        };

    },[nutrition]);




    const remaining = useMemo(() => {

    if (!nutrition) {
        return {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0
        };
    }

    return {
        calories: Math.max(
            0,
            (nutrition.targets.calories ?? 0) -
            (nutrition.summary.calories ?? 0)
        ),

        protein: Math.max(
            0,
            (nutrition.targets.protein ?? 0) -
            (nutrition.summary.protein ?? 0)
        ),

        carbs: Math.max(
            0,
            (nutrition.targets.carbs ?? 0) -
            (nutrition.summary.carbs ?? 0)
        ),

        fats: Math.max(
            0,
            (nutrition.targets.fats ?? 0) -
            (nutrition.summary.fats ?? 0)
        )
    };

}, [nutrition]);

if (loading) {
    return (
        <VStack spacing={6} align="stretch">

            <Skeleton
                height="120px"
                borderRadius="2xl"
            />

            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2,
                    xl: 4
                }}
                spacing={6}
                width="100%"

            >
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        height="180px"
                        borderRadius="2xl"
                    />
                ))}
            </SimpleGrid>

            <Skeleton
                height="320px"
                borderRadius="2xl"
            />

            <Skeleton
                height="220px"
                borderRadius="2xl"
            />

        </VStack>
    );
}

    if(!nutrition){

        return(

            <Alert

                status="warning"

                borderRadius="xl"

            >

                <AlertIcon/>

                <AlertTitle>

                    Unable to load nutrition

                </AlertTitle>

            </Alert>

        );

    }

    return(

<VStack
    spacing={8}
    align="stretch"
>

    <Box>

        <Heading
            size="lg"
            mb={2}
        >
            Nutrition Intelligence
        </Heading>

        <Text
            color="gray.500"
            fontSize="sm"
            mb={5}
        >
            AI-powered nutrition analysis for the selected period.
        </Text>

        <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            index={
                period === "today"
                    ? 0
                    : period === "week"
                    ? 1
                    : 2
            }
            onChange={(index) => {

                setPeriod(
                    index === 0
                        ? "today"
                        : index === 1
                        ? "week"
                        : "month"
                );

            }}
        >

            <TabList>

                <Tab>Today</Tab>

                <Tab>Week</Tab>

                <Tab>Month</Tab>

            </TabList>

        </Tabs>

    </Box>

    <NutritionScoreCard
        score={nutrition.nutrition_score.score}
        grade={nutrition.nutrition_score.grade}
        status={nutrition.nutrition_score.status}
        breakdown={nutrition.nutrition_score.breakdown}
    />

    <AppleSection

           

                title={`${periodTitle} Nutrition`}

              
                // subtitle={`Nutrition intake for ${periodTitle.toLowerCase()}`}

                subtitle={
    period === "today"
        ? "Today's nutrition intake"
        : `Total nutrition intake for ${periodTitle.toLowerCase()}`
}
            >
{/* 
                <SimpleGrid

                    columns={{

                        base:1,

                        md:2,

                        xl:4

                    }}

                    spacing={6}

                > */}
                <Grid
    templateColumns="repeat(auto-fit,minmax(280px,1fr))"
    gap={6}
    w="100%"
>

                                    <MetricCard
                        title="Calories"
                        icon={FiZap}
                        value={displayNutrition.calories ?? 0}
                        target={displayTargets?.calories ?? 0}
                        remaining={displayRemaining?.calories ?? 0}
                        progress={completion?.calories ?? 0}
                        unit="kcal"
                        color="orange"
                      
                    />

                    <MetricCard
                        title="Protein"
                        icon={FiTrendingUp}
                        value={displayNutrition?.protein ?? 0}
                        target={displayTargets?.protein ?? 0}
                        remaining={displayRemaining?.protein ?? 0}
                        progress={completion?.protein ?? 0}
                        unit="g"
                        color="green"
                    
                    />

                    <MetricCard
                        title="Carbs"
                        icon={FiActivity}
                        value={displayNutrition.carbs ?? 0}
                        target={displayTargets?.carbs ?? 0}
                        remaining={displayRemaining?.carbs ?? 0}
                        progress={completion?.carbs ?? 0}
                        unit="g"
                        color="blue"
                    
                    />

                    <MetricCard
                        title="Fats"
                        icon={FiTarget}
                        value={displayNutrition?.fats ?? 0}
                        target={displayTargets?.fats ?? 0}
                        remaining={displayRemaining?.fats ?? 0}
                        progress={completion?.fats ?? 0}
                        unit="g"
                        color="purple"
                        w="100%"
                        minH="220px"
                    />

                </Grid>

            </AppleSection>

            <AppleSection
                title={`${periodTitle} Summary`}
                subtitle={`Overall nutrition consumed during ${periodTitle.toLowerCase()}`}
            >

                <Grid
                    templateColumns={{
                        base: "1fr",
                        lg: "2fr 1fr"
                    }}
                    gap={8}
                >

                    <GridItem>

                        <VStack
                            align="stretch"
                            spacing={5}
                        >

                            <SummaryRow
                                label="Calories"
                                consumed={displayNutrition.calories}
                                target={displayTargets.calories}
                                color="orange"
                            />

                            <SummaryRow
                                label="Protein"
                                consumed={displayNutrition.protein}
                                target={displayTargets.protein}
                                color="green"
                            />

                            <SummaryRow
                                label="Carbohydrates"
                                consumed={displayNutrition.carbs}
                                target={displayTargets.carbs}
                                color="blue"
                            />

                            <SummaryRow
                                label="Fats"
                                consumed={displayNutrition.fats}
                                target={displayTargets.fats}
                                color="purple"
                            />

                        </VStack>

                    </GridItem>

                    <GridItem>

                        {period === "today" && (

                        <Box
                            borderRadius="2xl"
                            bg="gray.50"
                            p={6}
                        >

                            <Heading
                                size="sm"
                                mb={5}
                            >
                                Fiber Intake
                            </Heading>

                            <Stat>

                                <StatLabel>
                                   { period === "today"

                                    ? "Today's Fiber"

                                    : "Average Daily Fiber" }
                                </StatLabel>

                                <StatNumber>
                                    {nutrition.summary.fiber} g
                                </StatNumber>

                                <StatHelpText>
                                    Recommended:
                                    {" "}
                                    25–35 g
                                </StatHelpText>

                            </Stat>

                            <Divider my={5} />

                            
                                

                            <Heading
                                size="sm"
                                mb={3}
                            >
                                Remaining Today
                            </Heading>

                            <VStack
                                align="stretch"
                                spacing={3}
                            >

                                <RemainingRow
                                    label="Calories"
                                    value={displayRemaining?.calories}
                                    unit="kcal"
                                />

                                <RemainingRow
                                    label="Protein"
                                    value={displayRemaining?.protein}
                                    unit="g"
                                />

                                <RemainingRow
                                    label="Carbs"
                                    value={displayRemaining?.carbs}
                                    unit="g"
                                />

                                <RemainingRow
                                    label="Fats"
                                    value={displayRemaining?.fats}
                                    unit="g"
                                />

                            </VStack>
                            

                            

                        </Box>
                        )}

                    </GridItem>

                </Grid>

            </AppleSection>

                        <AppleSection
                title="Nutrition Insights"
                subtitle="AI-generated recommendations"
            >

                <VStack
                    spacing={4}
                    align="stretch"
                >

                    {
                        nutrition.insights.length === 0 ? (

                            <Alert
                                status="success"
                                borderRadius="xl"
                            >
                                <AlertIcon />
                                <AlertTitle>
                                    Great Job!
                                </AlertTitle>
                                <AlertDescription>
                                    No nutrition issues detected today.
                                </AlertDescription>
                            </Alert>

                        ) : (

                            nutrition.insights.map((item, index) => (

                                <InsightCard
                                    key={index}
                                    severity={item.severity}
                                    category={item.category}
                                    title={item.title}
                                    description={item.description}
                                />

                            ))

                        )

                    }

                </VStack>

            </AppleSection>

            <AppleSection
                title="Coach Intelligence"
                subtitle="Recommendations for coaches"
            >

                <VStack
                    spacing={4}
                    align="stretch"
                >

                    {

                        nutrition.coach_insights.length === 0 ? (

                            <Alert
                                status="success"
                                borderRadius="xl"
                            >
                                <AlertIcon/>
                                <AlertTitle>

                                    Nothing needs attention

                                </AlertTitle>
                            </Alert>

                        ) : (

                            nutrition.coach_insights.map((item,index)=>(

                                <InsightCard

                                    key={index}

                                    severity={item.severity}

                                    category="Coach"

                                    title={item.title}

                                    description={item.description}

                                />

                            ))

                        )

                    }

                </VStack>

            </AppleSection>
{/* 
            {period === "today" && (

            <AppleSection

                title={`${periodTitle} Meals`}

                // subtitle={`${nutrition.meals.length} meals logged today`}

                subtitle={`${nutrition.meals.length} meals logged during ${periodTitle.toLowerCase()}`}

            >

                <VStack

                    spacing={5}

                    align="stretch"

                >

                    {

                        nutrition.meals.map((meal)=>(

                            <Box

                                key={meal.id}

                                borderRadius="2xl"

                                border="1px solid"

                                borderColor="gray.100"

                                p={5}

                            >

                                <HStack

                                    justify="space-between"

                                    mb={4}

                                >

                                    <Heading

                                        size="sm"

                                    >

                                        {meal.meal_type}

                                    </Heading>

                                    <Badge

                                        colorScheme="blue"

                                        px={3}

                                        py={1}

                                        borderRadius="full"

                                    >

                                        {meal.calories} kcal

                                    </Badge>

                                </HStack>

                                <SimpleGrid

                                    columns={{

                                        base:2,

                                        md:4

                                    }}

                                    spacing={4}

                                    mb={5}

                                >

                                    <MiniMacro

                                        title="Protein"

                                        value={meal.protein}

                                    />

                                    <MiniMacro

                                        title="Carbs"

                                        value={meal.carbs}

                                    />

                                    <MiniMacro

                                        title="Fats"

                                        value={meal.fats}

                                    />

                                    <MiniMacro

                                        title="Fiber"

                                        value={meal.fiber}

                                    />

                                </SimpleGrid>

                                <Divider mb={4}/>

                                <VStack

                                    align="stretch"

                                    spacing={3}

                                >

                                    {

                                        meal.food_items.map((food,index)=>(

                                            <HStack

                                                key={index}

                                                justify="space-between"

                                            >

                                                <VStack

                                                    align="start"

                                                    spacing={0}

                                                >

                                                    <Text

                                                        fontWeight="600"

                                                    >

                                                        {food.name}

                                                    </Text>

                                                    <Text

                                                        fontSize="sm"

                                                        color="gray.500"

                                                    >

                                                        {food.serving.label}

                                                    </Text>

                                                </VStack>

                                                <Badge

                                                    colorScheme="green"

                                                >

                                                    {food.calories} kcal

                                                </Badge>

                                            </HStack>

                                        ))

                                    }

                                </VStack>

                            </Box>

                        ))

                    }

                </VStack>

            </AppleSection>
            )} */}


            {period === "today" && (
    <AppleSection
        title={`${periodTitle} Meals`}
        subtitle={`${nutrition.meals.length} meals logged during ${periodTitle.toLowerCase()}`}
    >
        <Accordion allowMultiple>
            {nutrition.meals.map((meal) => (
                <AccordionItem
                    key={meal.id}
                    border="none"
                    mb={4}
                >
                    <AppleCard>

                        <AccordionButton
                            px={0}
                            py={2}
                            _hover={{ bg: "transparent" }}
                        >
                            <Flex
                                flex="1"
                                justify="space-between"
                                align="center"
                            >

                                {/* Left Side */}
                                <HStack spacing={4}>

                                    <Box
                                        bg="blue.50"
                                        p={3}
                                        borderRadius="xl"
                                    >
                                        <Text fontSize="xl">
                                            {meal.meal_type === "Breakfast"
                                                ? "🍳"
                                                : meal.meal_type === "Lunch"
                                                ? "🍛"
                                                : meal.meal_type === "Dinner"
                                                ? "🍽️"
                                                : "🥜"}
                                        </Text>
                                    </Box>

                                    <VStack
                                        align="start"
                                        spacing={0}
                                    >
                                        <Heading size="sm">
                                            {meal.meal_type}
                                        </Heading>

                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                        >
                                            {meal.food_items.length} foods
                                        </Text>
                                    </VStack>

                                </HStack>

                                {/* Right Side */}
                                <HStack spacing={5}>

                                    <VStack
                                        spacing={0}
                                        align="end"
                                    >
                                        <Text
                                            fontWeight="700"
                                        >
                                            {meal.calories} kcal
                                        </Text>

                                        <Text
                                            fontSize="xs"
                                            color="green.500"
                                        >
                                            {meal.protein} g Protein
                                        </Text>
                                    </VStack>

                                    <AccordionIcon />

                                </HStack>

                            </Flex>

                        </AccordionButton>

                        <AccordionPanel
                            px={0}
                            pt={5}
                        >

                            {/* Meal Macros */}

                            <SimpleGrid
                                columns={{
                                    base: 2,
                                    md: 4
                                }}
                                spacing={4}
                                mb={5}
                            >

                                <MiniMacro
                                    title="Protein"
                                    value={meal.protein}
                                />

                                <MiniMacro
                                    title="Carbs"
                                    value={meal.carbs}
                                />

                                <MiniMacro
                                    title="Fats"
                                    value={meal.fats}
                                />

                                <MiniMacro
                                    title="Fiber"
                                    value={meal.fiber}
                                />

                            </SimpleGrid>

                            <Divider mb={5} />

                            {/* Food List */}

                            <VStack
                                spacing={4}
                                align="stretch"
                            >

                                {meal.food_items.map((food, index) => (

                                    <Flex
                                        key={index}
                                        justify="space-between"
                                        align="center"
                                        p={3}
                                        bg="gray.50"
                                        borderRadius="xl"
                                    >

                                        <VStack
                                            align="start"
                                            spacing={0}
                                        >
                                            <Text
                                                fontWeight="600"
                                            >
                                                {food.name}
                                            </Text>

                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                {food.serving.label}
                                            </Text>
                                        </VStack>

                                        <Badge
                                            colorScheme="green"
                                            borderRadius="full"
                                            px={3}
                                            py={1}
                                        >
                                            {food.calories} kcal
                                        </Badge>

                                    </Flex>

                                ))}

                            </VStack>

                            <Divider my={5} />

                            {/* Meal Total */}

                            {/* <SimpleGrid
                                columns={{
                                    base: 2,
                                    md: 4
                                }}
                                spacing={4}
                            >

                                <MiniMacro
                                    title="Calories"
                                    value={meal.calories}
                                />

                                <MiniMacro
                                    title="Protein"
                                    value={meal.protein}
                                />

                                <MiniMacro
                                    title="Carbs"
                                    value={meal.carbs}
                                />

                                <MiniMacro
                                    title="Fats"
                                    value={meal.fats}
                                />

                            </SimpleGrid> */}

                        </AccordionPanel>

                    </AppleCard>

                </AccordionItem>
            ))}
        </Accordion>
    </AppleSection>
)}

        </VStack>
       

    );

};

interface MetricCardProps {
    title: string;
    icon: IconType;
    value: number;
    target: number;
    remaining: number;
    progress: number;
    unit: string;
    color: string;
}

const MetricCard = ({
    title,
    icon: Icon,
    value,
    target,
    remaining,
    progress,
    unit,
    color
}: MetricCardProps) => {

    return (

        <Box
            border="1px solid"
            borderColor="gray.100"
            borderRadius="2xl"
            p={5}
            bg="white"
        >

            <HStack
                justify="space-between"
                mb={4}
            >

                <HStack>

                    <Box
                        p={3}
                        borderRadius="xl"
                        bg={`${color}.50`}
                        color={`${color}.500`}
                    >
                        <Icon size={20}/>
                    </Box>

                    <Heading size="sm">
                        {title}
                    </Heading>

                </HStack>

                <Badge
                    colorScheme={color}
                    borderRadius="full"
                >
                    {Math.round(progress)}%
                </Badge>

            </HStack>

            <Heading
                size="lg"
                mb={1}
            >
                {value}
                <Text
                    as="span"
                    fontSize="md"
                    color="gray.500"
                >
                    {" "}
                    {unit}
                </Text>
            </Heading>

            <Text
                color="gray.500"
                fontSize="sm"
            >
                Target: {target} {unit}
            </Text>

            <Progress
                mt={4}
                value={progress}
                borderRadius="full"
                colorScheme={color}
            />

            <Text
                mt={3}
                fontSize="sm"
                color="gray.600"
            >
                Remaining: {remaining} {unit}
              
            </Text>

        </Box>

    );

};

interface SummaryRowProps{

    label:string;

    consumed:number;

    target:number;

    color:string;

}

const SummaryRow=({

    label,

    consumed,

    target,

    color

}:SummaryRowProps)=>(

    <Box>

        <HStack

            justify="space-between"

            mb={2}

        >

            <Text
                fontWeight="600"
            >
                {label}
            </Text>

            <Text
                color="gray.500"
            >
                {consumed} / {target}
            </Text>

        </HStack>

        <Progress

            // value={Math.min(

            //     100,

            //     (consumed/target)*100

            // )}
            value={
    target === 0
        ? 0
        : Math.min(
              100,
              (consumed / target) * 100
          )
}

            colorScheme={color}

            borderRadius="full"

        />

    </Box>

);

interface RemainingRowProps{

    label:string;

    value:number;

    unit:string;

}

const RemainingRow=({

    label,

    value,

    unit

}:RemainingRowProps)=>(

    <HStack

        justify="space-between"

    >

        <Text>

            {label}

        </Text>

        <Badge

            colorScheme={

                value===0

                ?"green"

                :"orange"

            }

            borderRadius="full"

            px={3}

        >

            {value} {unit}

        </Badge>

    </HStack>

);

interface InsightCardProps{

    severity:string;

    category:string;

    title:string;

    description:string;

}

const InsightCard=({

    severity,

    category,

    title,

    description

}:InsightCardProps)=>(

    <Alert

        status={

            severity==="warning"

                ?"warning"

                :severity==="error"

                ?"error"

                :"info"

        }

        borderRadius="xl"

        alignItems="start"

    >

        <AlertIcon mt={1}/>

        <Box>

            <HStack mb={1}>

                <Badge

                    colorScheme="blue"

                >

                    {category}

                </Badge>

                <AlertTitle>

                    {title}

                </AlertTitle>

            </HStack>

            <AlertDescription>

                {description}

            </AlertDescription>

        </Box>

    </Alert>

);

interface MiniMacroProps{

    title:string;

    value:number;

}

const MiniMacro=({

    title,

    value

}:MiniMacroProps)=>(

    <Stat

        border="1px solid"

        borderColor="gray.100"

        borderRadius="xl"

        p={4}

    >

        <StatLabel>

            {title}

        </StatLabel>

        <StatNumber>

            {value} g

        </StatNumber>

    </Stat>

);

export default NutritionOverview;