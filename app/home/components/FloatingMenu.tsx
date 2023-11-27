import { Menu, MenuItem } from "@mui/material";

export const FloatingMenu = ({
  isOpen,
  status,
  anchorEl,
  handleClose,
  handleClickEdit,
  handleClickChangeStatus,
  handleAddDoc,
}: {
  isOpen: boolean;
  status: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleClickEdit: () => void;
  handleClickChangeStatus: () => void;
  handleAddDoc: () => void;
}) => {
  const managerStatusList = ["TODO", "IN_PROGRESS"];
  const isChangeableStatus = managerStatusList.includes(status);
  return (
    <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
      {isChangeableStatus && (
        <MenuItem onClick={handleClickChangeStatus}>Change Status</MenuItem>
      )}
      <MenuItem onClick={handleAddDoc}>Add Document</MenuItem>
    </Menu>
  );
};
