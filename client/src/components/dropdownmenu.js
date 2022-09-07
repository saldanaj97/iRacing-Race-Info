import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { WeekContext } from "../contexts/WeekContext";
import { FilterContext } from "../contexts/FilterContext";

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
  const { categoryFilter, licenseFilter, ownedContentFilter, setCategoryFilter, setLicenseFilter, setOwnedContentFilter } = useContext(FilterContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  /* Function that will handle changing the state of the global filter 
     Parameters: dropdownSelected - the value that has been selected from the dropdown menu
     Returns: N/A
  */
  const handleSelection = (dropdownSelection) => {
    if (dropdownID === "weekNumber") setWeekNum(dropdownSelection);
    if (dropdownID === "categoryFilter") setCategoryFilter(dropdownSelection);
    if (dropdownID === "licenseFilter") setLicenseFilter(dropdownSelection);
    if (dropdownID === "ownedContentFilter") setOwnedContentFilter(dropdownSelection);
  };

  /* Function that will update the value that is displayed when a user selects an item
     Parameters: N/A
     Returns: N/A
  */
  const handleDropdownOptionRender = () => {
    if (dropdownID === "weekNumber") return weekNum;
    if (dropdownID === "categoryFilter") return categoryFilter;
    if (dropdownID === "licenseFilter") return licenseFilter;
    if (dropdownID === "ownedContentFilter") return ownedContentFilter;
  };

  return (
    <div>
      <Button id='dropdown-button' aria-haspopup='true' variant='outlined' onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} sx={{ display: "flex", justifyContent: "space-between", color: "black", borderColor: "grey.400", width: "80%" }}>
        {handleDropdownOptionRender()}
      </Button>
      <StyledMenu id='item-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((dropdownSelection) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose();
                handleSelection(dropdownSelection);
              }}
            >
              {dropdownSelection}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
