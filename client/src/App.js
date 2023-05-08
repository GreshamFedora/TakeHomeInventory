import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import { Navbar, InventoryView, ShoppingListView} from './components';

const App = () => (
    <BrowserRouter>
        <Box sx={{ backgroundColor: '#000' }}>
            <Navbar />
                <Routes>
                    <Route exact path="/" element={<InventoryView />} />
                    <Route exact path="/shoppingList" element={<ShoppingListView />} />
                </Routes>
        </Box>
    </BrowserRouter>
);

export default App
