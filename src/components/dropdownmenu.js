import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { WeekContext } from "../contexts/WeekContext";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha("#2b2d42", theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function CustomizedMenu({ menuItems, dropdownID }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { weekNum, setWeekNum } = useContext(WeekContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (dropdownSelection) => {
    setWeekNum(dropdownSelection);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='dropdown-button'
        aria-haspopup='true'
        variant='outlined'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ display: "flex", justifyContent: "space-between", color: "black", borderColor: "grey.400", width: "80%" }}
      >
        {menuItems[0]}
      </Button>
      <StyledMenu id='item-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((dropdownSelection) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose(dropdownSelection);
              }}
              disableRipple
            >
              {dropdownSelection}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
