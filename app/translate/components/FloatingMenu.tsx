import { Menu, MenuItem } from "@mui/material";

export const FloatingMenu = ({
  open,
  anchorEl,
  onClose,
  onClick,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onClick: () => void;
}) => {
  return (
    <Menu {...{ open, anchorEl, onClose }}>
      <MenuItem onClick={onClick}>Change Status</MenuItem>
    </Menu>
  );
};
