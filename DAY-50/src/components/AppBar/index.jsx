import { Box, SvgIcon, Typography, Button } from "@mui/material";
import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
function AppBar() {
    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        window.location.reload();
    };
    return (
        <Box
            px={2}
            sx={{
                backgroundColor: "primary.dark",
                width: "100%",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AppsIcon sx={{ color: "white" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Trello
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Button variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
}

export default AppBar;
