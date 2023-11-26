import { Menu, MenuItem } from "@mui/material";

export const FloatingMenu = ({
  isOpen,
  status,
  anchorEl,
  handleClose,
  handleClickEdit,
  handleClickChangeStatus,
}: {
  isOpen: boolean;
  status: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleClickEdit: () => void;
  handleClickChangeStatus: () => void;
}) => {
  const managerStatusList = ["TODO", "IN_PROGRESS", "ARCHIVE"];
  const isChangeableStatus = managerStatusList.includes(status);
  return (
    <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
      <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
      {isChangeableStatus && (
        <MenuItem onClick={handleClickChangeStatus}>Change Status</MenuItem>
      )}
    </Menu>
  );
};
