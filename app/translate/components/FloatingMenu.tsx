import { Menu, MenuItem } from "@mui/material";

export const FloatingMenu = ({
  open,
  anchorEl,
  status,
  onClose,
  onClick,
  handleShow,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  status: string;
  onClose: () => void;
  onClick: () => void;
  handleShow: () => void;
}) => {
  const translatorStatusList = ["TODO", "IN_PROGRESS", "REVISION"];
  const isChangeableStatus = translatorStatusList.includes(status);
  return (
    <Menu {...{ open, anchorEl, onClose }}>
      <MenuItem onClick={handleShow}>Project Info</MenuItem>
      {isChangeableStatus && (
        <MenuItem onClick={onClick}>Change Status</MenuItem>
      )}
    </Menu>
  );
};
