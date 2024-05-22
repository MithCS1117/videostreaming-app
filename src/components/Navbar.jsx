import { Hidden, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Hidden smDown>
          <Typography
            fontWeight="bold"
            ml={1}
            sx={{ color: "white" }}
            display="flex"
            flexDirection="row"
          >
            <Typography variant="h4">Vid</Typography>
            <Typography variant="h4" sx={{ color: "#9403fc" }}>
              Tub
            </Typography>
          </Typography>
        </Hidden>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
