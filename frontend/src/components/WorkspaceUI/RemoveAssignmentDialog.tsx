import {

  Button,

  Text,

  Stack,

  useToast

} from "@chakra-ui/react";

import WorkspaceDrawer
from "./WorkspaceDrawer";

import {

  removeAssignment

} from "../../services/workspace/assignments.service";

interface Props{

  isOpen:boolean;

  onClose:()=>void;

  assignment:any;

  onSuccess?:()=>void;

}

const RemoveAssignmentDialog=({

  isOpen,

  onClose,

  assignment,

  onSuccess

}:Props)=>{

const toast=
useToast();

const handleRemove=
async()=>{

try{

await removeAssignment(

assignment.client.assignment_id

);

toast({

status:"success",

title:"Assignment removed."

});

onSuccess?.();

}

catch(err:any){

toast({

status:"error",

title:

err.response?.data?.error ||

"Unable to remove assignment."

});

}

};

return(

<WorkspaceDrawer

isOpen={isOpen}

onClose={onClose}

title="Remove Assignment"

footer={

<Stack
direction="row"
justify="flex-end"
w="100%"
>

<Button
onClick={onClose}
>

Cancel

</Button>

<Button

colorScheme="red"

onClick={handleRemove}

>

Remove

</Button>

</Stack>

}

>

<Text>

Are you sure you want to remove

{" "}

<b>

{assignment?.client?.name}

</b>

from

{" "}

<b>

{assignment?.coach?.name}

</b>

?

</Text>

</WorkspaceDrawer>

);

};

export default RemoveAssignmentDialog;