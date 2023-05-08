import { Stack } from "@mui/material" ;
import { Link } from "react-router-dom";


//import SearchBar from "./SearchBar";

const Navbar = () => (
  <Stack 
    direction="row" 
    alignItems="center" 
    p={4} 
    sx={{ position: "sticky", background: "#000", top: 0, justifyContent: "space-around"}}>
      
      <Link to="/" style={{ display: 'flex', alignItems: 'center'}}>
      <h2 style={{ color: "white"}}>Inventory</h2>
      </Link>
      
      <Link to="/shoppingList" style={{ display: 'flex', alignItems: 'center'}}>
        <h2 style={{ color: "white"}}>Shopping List</h2>
      </Link>
      
  {/*<SearchBar />*/}
  </Stack>
)

export default Navbar