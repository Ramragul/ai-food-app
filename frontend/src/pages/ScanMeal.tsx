import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FiArrowLeft,
  FiCamera,
  FiImage,
  FiRefreshCw,
} from "react-icons/fi";

import {
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


const ScanMeal = () => {

  const navigate = useNavigate();

  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);


  const handleImageSelect =
    (
      event:
        React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith("image/")
      ) {

        return;

      }

      setImage(file);

      const objectUrl =
        URL.createObjectURL(file);

      setPreview(objectUrl);

    };


  const clearImage = () => {

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);

    setPreview(null);

  };


  return (

    <Box
      minH="100vh"
      bg="linear-gradient(
        180deg,
        #ffffff 0%,
        #f4faff 100%
      )"
    >

      <Box
        maxW="480px"
        mx="auto"
        px={5}
        pt={6}
        pb={20}
      >

        {/* Back */}

        <Button
          variant="ghost"
          leftIcon={
            <Icon as={FiArrowLeft} />
          }
          px={0}
          mb={8}
          onClick={() =>
            navigate("/home")
          }
        >
          Dashboard
        </Button>


        {!preview ? (

          <VStack
            spacing={7}
            align="stretch"
          >

            {/* Hero */}

            <VStack
              spacing={3}
              textAlign="center"
            >

              <Center
                w="76px"
                h="76px"
                mx="auto"
                borderRadius="26px"
                bg="brand.50"
                color="brand.500"
              >

                <Icon
                  as={FiCamera}
                  boxSize={9}
                />

              </Center>


              <Heading
                fontSize="3xl"
                letterSpacing="-1px"
              >
                Scan your meal
              </Heading>


              <Text
                color="gray.500"
                fontSize="sm"
                lineHeight="1.7"
                maxW="350px"
              >
                Take a photo of your meal
                and let NEKA identify the
                foods and estimate their
                portions.
              </Text>

            </VStack>


            {/* Camera */}

            <Button
              h="64px"
              borderRadius="22px"
              colorScheme="blue"
              leftIcon={
                <Icon
                  as={FiCamera}
                  boxSize={5}
                />
              }
              fontSize="md"
              fontWeight="700"
              onClick={() =>
                cameraInputRef.current?.click()
              }
            >
              Take a photo
            </Button>


            {/* Gallery */}

            <Button
              h="64px"
              borderRadius="22px"
              variant="outline"
              leftIcon={
                <Icon
                  as={FiImage}
                  boxSize={5}
                />
              }
              fontSize="md"
              fontWeight="700"
              onClick={() =>
                galleryInputRef.current?.click()
              }
            >
              Choose from gallery
            </Button>


            {/* Explanation */}

            <Box
              bg="white"
              borderRadius="24px"
              p={5}
              border="1px solid"
              borderColor="gray.100"
              boxShadow="0 12px 35px rgba(0,0,0,.05)"
            >

              <VStack
                align="stretch"
                spacing={3}
              >

                <Text
                  fontWeight="700"
                >
                  ✨ What NEKA will do
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Identify the foods on
                  your plate
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Estimate portion sizes
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Calculate nutrition
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Let you review everything
                  before saving
                </Text>

              </VStack>

            </Box>


            {/* Camera input */}

            <Input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              display="none"
              onChange={
                handleImageSelect
              }
            />


            {/* Gallery input */}

            <Input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              display="none"
              onChange={
                handleImageSelect
              }
            />

          </VStack>

        ) : (

          /* --------------------------------
             IMAGE PREVIEW
          -------------------------------- */

          <VStack
            spacing={5}
            align="stretch"
          >

            <Heading
              fontSize="2xl"
            >
              Review your photo
            </Heading>


            <Box
              borderRadius="28px"
              overflow="hidden"
              bg="gray.100"
              boxShadow="
                0 18px 45px
                rgba(0,0,0,.10)
              "
            >

              <Image
                src={preview}
                w="100%"
                maxH="520px"
                objectFit="cover"
                alt="Meal preview"
              />

            </Box>


            <Box
              bg="blue.50"
              borderRadius="20px"
              p={4}
            >

              <Text
                fontSize="sm"
                color="blue.700"
                fontWeight="600"
              >
                💡 For better accuracy
              </Text>

              <Text
                fontSize="sm"
                color="blue.600"
                mt={1}
              >
                Make sure the whole plate
                is visible and the food is
                reasonably well lit.
              </Text>

            </Box>


            <HStack spacing={3}>

              <Button
                flex={1}
                h="56px"
                borderRadius="18px"
                variant="outline"
                leftIcon={
                  <Icon
                    as={FiRefreshCw}
                  />
                }
                onClick={clearImage}
              >
                Retake
              </Button>


              <Button
                flex={2}
                h="56px"
                borderRadius="18px"
                colorScheme="blue"
                fontWeight="700"
                isDisabled={!image}
              >
                Analyze Meal ✨
              </Button>

            </HStack>

          </VStack>

        )}

      </Box>

    </Box>

  );
};

export default ScanMeal;