// Version 1

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState
// } from "react";

// import {
//   getWorkspaceDashboard
// } from "../services/workspace/dashboard.service";

// interface WorkspaceOrganization {

//   id: number;

//   name: string;

//   organization_type: string;

//   workspace_code: string;

// }

// interface WorkspaceContextType {

//   organization: WorkspaceOrganization | null;

//   isLoading: boolean;

//   loadWorkspace: () => Promise<void>;

//   clearWorkspace: () => void;

// }

// const WorkspaceContext =
//   createContext<WorkspaceContextType | null>(
//     null
//   );

// export const WorkspaceProvider = ({
//   children
// }: any) => {

//   const [

//     organization,

//     setOrganization

//   ] = useState<WorkspaceOrganization | null>(
//     null
//   );

//   const [

//     isLoading,

//     setIsLoading

//   ] = useState(true);

//   const loadWorkspace =
//     async () => {

//       try {

//         setIsLoading(true);

//         const dashboard =
//           await getWorkspaceDashboard();

//         setOrganization(
//           dashboard.organization
//         );

//       }

//       catch (error) {

//         console.error(
//           "Unable to load workspace",
//           error
//         );

//         setOrganization(null);

//       }

//       finally {

//         setIsLoading(false);

//       }

//     };

//   const clearWorkspace = () => {

//     setOrganization(null);

//   };

//   useEffect(() => {

//     void loadWorkspace();

//   }, []);

//   return (

//     <WorkspaceContext.Provider

//       value={{

//         organization,

//         isLoading,

//         loadWorkspace,

//         clearWorkspace

//       }}

//     >

//       {children}

//     </WorkspaceContext.Provider>

//   );

// };

// export const useWorkspace = () => {

//   const context =
//     useContext(
//       WorkspaceContext
//     );

//   if (!context) {

//     throw new Error(

//       "useWorkspace must be used inside WorkspaceProvider"

//     );

//   }

//   return context;

// };



// Version 2
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getWorkspaceDashboard
} from "../services/workspace/dashboard.service";

interface WorkspaceOrganization {

  id: number;

  name: string;

  organization_type: string;

  workspace_code: string;

}

interface WorkspaceContextType {

  organization: WorkspaceOrganization | null;

  isLoading: boolean;

  loadWorkspace: () => Promise<void>;

  clearWorkspace: () => void;

}




const WorkspaceContext =
  createContext<WorkspaceContextType | null>(
    null
  );

export const WorkspaceProvider = ({
  children
}: any) => {

  const [

    organization,

    setOrganization

  ] = useState<WorkspaceOrganization | null>(
    null
  );

  const [

    isLoading,

    setIsLoading

  ] = useState(true);

  const loadWorkspace =
    async () => {

      try {

        setIsLoading(true);

        const dashboard =
          await getWorkspaceDashboard();

        setOrganization(
          dashboard.organization
        );

      }

      catch (error) {

        console.error(
          "Unable to load workspace",
          error
        );

        setOrganization(null);

      }

      finally {

        setIsLoading(false);

      }

    };

  const clearWorkspace = () => {

    setOrganization(null);

  };

  useEffect(() => {

    void loadWorkspace();

  }, []);

  return (

    <WorkspaceContext.Provider

      value={{

        organization,

        isLoading,

        loadWorkspace,

        clearWorkspace

      }}

    >

      {children}

    </WorkspaceContext.Provider>

  );

};

export const useWorkspace = () => {

  const context =
    useContext(
      WorkspaceContext
    );

  if (!context) {

    throw new Error(

      "useWorkspace must be used inside WorkspaceProvider"

    );

  }

  return context;

};