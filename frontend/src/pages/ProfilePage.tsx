


// Version 1

// import {
//     Box,
//     Button,
//     Input,
//     InputGroup,
//     InputRightAddon,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     VStack,
//     Text,
//     useToast,
//     Spinner,
//     HStack
//   } from "@chakra-ui/react";
//   import { useEffect, useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import api from "../utils/api";
//   import { useAuth } from "../context/AuthContext";
//   import { ChevronDownIcon } from "@chakra-ui/icons";
  
//   type Profile = {
//     name: string;
//     nickname: string;
//     age_range: string;
//     gender: string;
//     height_cm: number;
//   };
  
//   type ActiveProfile = {
//     weight_kg: number;
//     height_cm: number;
//   };
  
//   const ProfilePage: React.FC = () => {
//     const [profile, setProfile] = useState<Profile | null>(null);
//     const [activeProfile, setActiveProfile] = useState<ActiveProfile | null>(null);
//     const [loading, setLoading] = useState(true);
  
//     const toast = useToast();
//     const navigate = useNavigate();
//     const { user } = useAuth();
  
//     const AGE_OPTIONS = ["18-25", "26-35", "36-45", "45+"];
//     const GENDER_OPTIONS = ["male", "female"];
  
//     const fetchData = async () => {
//       try {
//         const userRes = await api.get("/user/profile");
//         setProfile(userRes.data);
//       } catch {
//         toast({ title: "Failed to load profile", status: "error" });
//       }
  
//       try {
//         const profileRes = await api.get("/profile/active/me");
//         setActiveProfile(profileRes.data);
//       } catch {
//         console.log("No active profile yet");
//       }
  
//       setLoading(false);
//     };
  
//     useEffect(() => {
//       if (user) {
//         setProfile({
//           name: user.name || "",
//           nickname: user.nickname || "",
//           age_range: user.age_range || "",
//           gender: user.gender || "",
//           height_cm: 0
          
//         });
//       }
//       fetchData();
//     }, []);
  
//     const handleChange = (key: keyof Profile, value: any) => {
//       setProfile((prev) => ({
//         ...(prev as Profile),
//         [key]: value
//       }));
//     };
  
//     const handleSave = async () => {
//       try {
//         await api.put("/user/profile", profile);
  
//         toast({
//           title: "Profile updated macha 😎",
//           status: "success"
//         });
//       } catch (err: any) {
//         toast({
//           title: err?.response?.data?.message || "Update failed 😢",
//           status: "error"
//         });
//       }
//     };
  
//     if (loading) return <Spinner size="lg" mt={10} />;
  
//     return (
//       <Box bg="#F7FAFC" minH="100vh" pb={24}>
//         <Box px={4} pt={4}>
//           <VStack spacing={5} align="stretch">
  
//             {/* 👤 HEADER CARD */}
//             <Box
//               p={4}
//               borderRadius="2xl"
//               bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//               color="white"
//             >
//               <Text fontSize="lg" fontWeight="bold">
//                 Hey {profile?.nickname || "Macha"} 👋
//               </Text>
//               <Text fontSize="sm" opacity={0.9}>
//                 Let’s keep your health on track
//               </Text>
//             </Box>
  
//             {/* 👤 DETAILS */}
//             <Box
//               p={4}
//               borderRadius="2xl"
//               bg="white"
//               boxShadow="0 6px 25px rgba(0,0,0,0.05)"
//             >
//               <Text fontWeight="bold" mb={3}>👤 Your Details</Text>
  
//               <VStack spacing={4}>
//                 <Input
//                   placeholder="Name"
//                   value={profile?.name || ""}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                   bg="gray.50"
//                   border="none"
//                 />
  
//                 <Input
//                   placeholder="Nickname"
//                   value={profile?.nickname || ""}
//                   onChange={(e) => handleChange("nickname", e.target.value)}
//                   bg="gray.50"
//                   border="none"
//                 />
  
//                 {/* INLINE SELECTS */}
//                 <HStack spacing={3} w="full">
  
//                   {/* Gender */}
//                   <Box flex={1}>
//                     <Text fontSize="xs" mb={1} color="gray.500">Gender</Text>
  
//                     <Menu>
//                       <MenuButton
//                         as={Button}
//                         rightIcon={<ChevronDownIcon />}
//                         w="full"
//                         bg="gray.50"
//                         borderRadius="xl"
//                         textAlign="left"
//                       >
//                         {profile?.gender || "Select"}
//                       </MenuButton>
  
//                       <MenuList borderRadius="xl" p={2}>
//                         {GENDER_OPTIONS.map((g) => (
//                           <MenuItem
//                             key={g}
//                             borderRadius="lg"
//                             _hover={{ bg: "blue.50" }}
//                             onClick={() => handleChange("gender", g)}
//                           >
//                             {g}
//                           </MenuItem>
//                         ))}
//                       </MenuList>
//                     </Menu>
//                   </Box>
  
//                   {/* Age */}
//                   <Box flex={1}>
//                     <Text fontSize="xs" mb={1} color="gray.500">Age</Text>
  
//                     <Menu>
//                       <MenuButton
//                         as={Button}
//                         rightIcon={<ChevronDownIcon />}
//                         w="full"
//                         bg="gray.50"
//                         borderRadius="xl"
//                         textAlign="left"
//                       >
//                         {profile?.age_range || "Select"}
//                       </MenuButton>
  
//                       <MenuList borderRadius="xl" p={2}>
//                         {AGE_OPTIONS.map((age) => (
//                           <MenuItem
//                             key={age}
//                             borderRadius="lg"
//                             _hover={{ bg: "blue.50" }}
//                             onClick={() => handleChange("age_range", age)}
//                           >
//                             {age}
//                           </MenuItem>
//                         ))}
//                       </MenuList>
//                     </Menu>
//                   </Box>
  
//                 </HStack>
//               </VStack>
//             </Box>
  
//             {/* ⚖️ BODY */}
//             <Box
//               p={4}
//               borderRadius="2xl"
//               bg="white"
//               boxShadow="0 6px 25px rgba(0,0,0,0.05)"
//             >
//               <Text fontWeight="bold" mb={3}>⚖️ Body Info</Text>
  
//               <VStack spacing={4}>
  
//                 <InputGroup>
//                   <Input
//                     placeholder="Height"
//                     type="number"
//                     value={activeProfile?.height_cm || ""}
//                     onChange={(e) =>
//                       handleChange(
//                         "height_cm",
//                         e.target.value === "" ? "" : Number(e.target.value)
//                       )
//                     }
//                     bg="gray.50"
//                     border="none"
//                   />
//                   <InputRightAddon>cm</InputRightAddon>
//                 </InputGroup>
  
//                 <HStack justify="space-between" w="full">
//                   <Text color="gray.600">Weight</Text>
//                   <Text fontWeight="bold" fontSize="lg">
//                     {activeProfile?.weight_kg ?? "--"} kg
//                   </Text>
//                 </HStack>
  
//                 <Button
//                   variant="link"
//                   color="#00BFFF"
//                   onClick={() => navigate("/goal-setup")}
//                 >
//                   Update Weight / Goal →
//                 </Button>
//               </VStack>
//             </Box>
  
//           </VStack>
//         </Box>
  
//         {/* 🚀 FLOATING SAVE BUTTON */}
//         <Box
//   position="fixed"
//   bottom="90px"   // 🔥 above bottom navbar
//   left="0"
//   right="0"
//   px={4}
//   zIndex={9999}   // 🔥 force on top
// >
//   <Button
//     w="full"
//     size="lg"
//     borderRadius="xl"
//     bg="linear-gradient(135deg, #7FDBFF, #00BFFF)"
//     color="white"
//     boxShadow="0 10px 30px rgba(0,0,0,0.2)"
//     _active={{ transform: "scale(0.98)" }}
//     onClick={handleSave}
//   >
//     Save Changes
//   </Button>
// </Box>
//       </Box>
//     );
//   };
  
//   export default ProfilePage;


// Version 2

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  Text,
  useToast,
  Spinner,
  HStack
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

type Profile = {
  name: string;
  nickname: string;
  age_range: string;
  gender: string;
  height_cm: number;
};

type ActiveProfile = {
  weight_kg: number;
  height_cm: number;
};

type WorkspaceInvitation = {
  id: number;
  invitation_token: string;
  invitation_type: string;
  invited_name: string;
  invited_mobile: string;
  invited_email: string;
  status: string;
  expires_at: string;
  created_at: string;

  organization_id: number;
  organization_name: string;
  organization_type: string;
  logo_url: string | null;
  role: string;
};

const ProfilePage: React.FC = () => {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeProfile, setActiveProfile] = useState<ActiveProfile | null>(null);

  const [pendingInvitations, setPendingInvitations] =
    useState<WorkspaceInvitation[]>([]);

  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const AGE_OPTIONS = [
    "18-25",
    "26-35",
    "36-45",
    "45+"
  ];

  const GENDER_OPTIONS = [
    "male",
    "female"
  ];

  const fetchData = async () => {

    try {

      const userRes = await api.get("/user/profile");
      setProfile(userRes.data);

    } catch {

      toast({
        title: "Failed to load profile",
        status: "error"
      });

    }

    try {

      const profileRes = await api.get("/profile/active/me");
      setActiveProfile(profileRes.data);

    } catch {

      console.log("No active profile yet");

    }

    // Workspace Invitations
    try {

      const invitationRes = await api.get(
        "/organizations/invitations/me"
      );

      const invitations =
        invitationRes.data?.data ?? [];

      setPendingInvitations(
        invitations.filter(
          (inv: WorkspaceInvitation) =>
            inv.status === "PENDING"
        )
      );

    } catch {

      setPendingInvitations([]);

    }

    setLoading(false);

  };

  useEffect(() => {

    if (user) {

      setProfile({
        name: user.name || "",
        nickname: user.nickname || "",
        age_range: user.age_range || "",
        gender: user.gender || "",
        height_cm: 0
      });

    }

    fetchData();

  }, []);

  const handleChange = (
    key: keyof Profile,
    value: any
  ) => {

    setProfile(prev => ({
      ...(prev as Profile),
      [key]: value
    }));

  };

  const handleSave = async () => {

    try {

      await api.put(
        "/user/profile",
        profile
      );

      toast({
        title: "Profile updated macha 😎",
        status: "success"
      });

    } catch (err: any) {

      toast({
        title:
          err?.response?.data?.message ??
          "Update failed 😢",
        status: "error"
      });

    }

  };

  if (loading)
    return (
      <Spinner
        size="lg"
        mt={10}
      />
    );

  return (

    <Box
      bg="#F7FAFC"
      minH="100vh"
      pb={24}
    >

      <Box
        px={4}
        pt={4}
      >

        <VStack
          spacing={5}
          align="stretch"
        >

          {/* HEADER */}

          <Box
            p={4}
            borderRadius="2xl"
            bg="linear-gradient(135deg,#7FDBFF,#00BFFF)"
            color="white"
          >

            <Text
              fontSize="lg"
              fontWeight="bold"
            >
              Hey {profile?.nickname || "Macha"} 👋
            </Text>

            <Text
              fontSize="sm"
              opacity={0.9}
            >
              Let's keep your health on track
            </Text>

          </Box>

          {/* WORKSPACE INVITATION */}

          {pendingInvitations.length > 0 && (

            <Box
              p={4}
              borderRadius="2xl"
              bg="white"
              boxShadow="0 6px 25px rgba(0,0,0,0.05)"
              cursor="pointer"
              transition="0.2s"
              _hover={{
                transform: "translateY(-2px)"
              }}
              onClick={() =>
                navigate("/invitations")
              }
            >

              <HStack justify="space-between">

                <VStack
                  align="start"
                  spacing={1}
                >

                  <Text
                    fontWeight="bold"
                    fontSize="md"
                  >
                    🔔 Workspace Invitation
                  </Text>

                  <Text
                    fontSize="sm"
                    color="gray.500"
                  >
                    {pendingInvitations[0].organization_name}
                    {" "}
                    invited you to join
                  </Text>

                </VStack>

                <Button
                  size="sm"
                  colorScheme="blue"
                  variant="ghost"
                >
                  Review →
                </Button>

              </HStack>

            </Box>

          )}

          {/* YOUR DETAILS */}

          <Box
            p={4}
            borderRadius="2xl"
            bg="white"
            boxShadow="0 6px 25px rgba(0,0,0,0.05)"
          >

            <Text
              fontWeight="bold"
              mb={3}
            >
              👤 Your Details
            </Text>

            <VStack spacing={4}>

              <Input
                placeholder="Name"
                value={profile?.name || ""}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
                bg="gray.50"
                border="none"
              />

              <Input
                placeholder="Nickname"
                value={profile?.nickname || ""}
                onChange={(e) =>
                  handleChange(
                    "nickname",
                    e.target.value
                  )
                }
                bg="gray.50"
                border="none"
              />

              <HStack
                spacing={3}
                w="full"
              >
                {/* Gender */}

<Box flex={1}>
  <Text
    fontSize="xs"
    mb={1}
    color="gray.500"
  >
    Gender
  </Text>

  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon />}
      w="full"
      bg="gray.50"
      borderRadius="xl"
      textAlign="left"
    >
      {profile?.gender || "Select"}
    </MenuButton>

    <MenuList
      borderRadius="xl"
      p={2}
    >
      {GENDER_OPTIONS.map((g) => (
        <MenuItem
          key={g}
          borderRadius="lg"
          _hover={{ bg: "blue.50" }}
          onClick={() =>
            handleChange("gender", g)
          }
        >
          {g}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
</Box>

{/* Age */}

<Box flex={1}>
  <Text
    fontSize="xs"
    mb={1}
    color="gray.500"
  >
    Age
  </Text>

  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon />}
      w="full"
      bg="gray.50"
      borderRadius="xl"
      textAlign="left"
    >
      {profile?.age_range || "Select"}
    </MenuButton>

    <MenuList
      borderRadius="xl"
      p={2}
    >
      {AGE_OPTIONS.map((age) => (
        <MenuItem
          key={age}
          borderRadius="lg"
          _hover={{ bg: "blue.50" }}
          onClick={() =>
            handleChange(
              "age_range",
              age
            )
          }
        >
          {age}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
</Box>

</HStack>

</VStack>

</Box>

{/* BODY INFO */}

<Box
  p={4}
  borderRadius="2xl"
  bg="white"
  boxShadow="0 6px 25px rgba(0,0,0,0.05)"
>

  <Text
    fontWeight="bold"
    mb={3}
  >
    ⚖️ Body Info
  </Text>

  <VStack spacing={4}>

    <InputGroup>

      <Input
        placeholder="Height"
        type="number"
        value={activeProfile?.height_cm || ""}
        onChange={(e) =>
          handleChange(
            "height_cm",
            e.target.value === ""
              ? ""
              : Number(e.target.value)
          )
        }
        bg="gray.50"
        border="none"
      />

      <InputRightAddon>
        cm
      </InputRightAddon>

    </InputGroup>

    <HStack
      justify="space-between"
      w="full"
    >

      <Text color="gray.600">
        Weight
      </Text>

      <Text
        fontWeight="bold"
        fontSize="lg"
      >
        {activeProfile?.weight_kg ??
          "--"}{" "}
        kg
      </Text>

    </HStack>

    <Button
      variant="link"
      color="#00BFFF"
      onClick={() =>
        navigate("/goal-setup")
      }
    >
      Update Weight / Goal →
    </Button>

  </VStack>

</Box>

</VStack>

</Box>

{/* SAVE BUTTON */}

<Box
  position="fixed"
  bottom="90px"
  left="0"
  right="0"
  px={4}
  zIndex={9999}
>

  <Button
    w="full"
    size="lg"
    borderRadius="xl"
    bg="linear-gradient(135deg,#7FDBFF,#00BFFF)"
    color="white"
    boxShadow="0 10px 30px rgba(0,0,0,0.2)"
    _active={{
      transform: "scale(0.98)"
    }}
    onClick={handleSave}
  >
    Save Changes
  </Button>

</Box>

</Box>

);

};

export default ProfilePage;