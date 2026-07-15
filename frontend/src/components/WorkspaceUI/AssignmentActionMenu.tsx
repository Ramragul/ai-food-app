import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";

import {
  MoreVertical,
  Eye,
  RefreshCw,
  Trash2
} from "lucide-react";

interface Props {

  onView: () => void;

  onTransfer: () => void;

  onRemove: () => void;

}

const AssignmentActionMenu = ({
  onView,
  onTransfer,
  onRemove
}: Props) => {

  return (

    <Menu>

      <MenuButton

        as={IconButton}

        aria-label="Actions"

        icon={<MoreVertical size={18} />}

        variant="ghost"

        size="sm"

      />

      <MenuList>

        <MenuItem

          icon={<Eye size={16} />}

          onClick={onView}

        >

          View Client

        </MenuItem>

        <MenuItem

          icon={<RefreshCw size={16} />}

          onClick={onTransfer}

        >

          Transfer Client

        </MenuItem>

        <MenuItem

          icon={<Trash2 size={16} />}

          color="red.500"

          onClick={onRemove}

        >

          Remove Assignment

        </MenuItem>

      </MenuList>

    </Menu>

  );

};

export default AssignmentActionMenu;