import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { client } from "~/assets/js/client";
import { config } from "~/assets/js/config";
import { v4 as uuidv4 } from "uuid";
import { splitDataToPost } from "~/utils/splitDataToPost";
uuidv4();

function ListColumns({ columns }) {
    const { SERVER_API } = config;
    client.setUrl(SERVER_API);
    const apiKey = localStorage.getItem("apiKey");
    const [openNewColForm, setOpenNewColForm] = useState(false);
    const toggleOpenNewColForm = () => setOpenNewColForm(!openNewColForm);
    const [newColTitle, setNewColTitle] = useState("");
    const addNewColumn = async () => {
        if (!newColTitle) {
            return;
        }

        const newCol = {
            column: uuidv4(),
            content: "new task",
            columnName: newColTitle,
        };
        const dataToPost = splitDataToPost(columns);
        dataToPost.push(newCol);

        const { data } = await client.post(`/tasks`, dataToPost, apiKey);
        if (data.status_code === "SUCCESS") {
            location.reload(500);
        }

        toggleOpenNewColForm();
        setNewColTitle("");
    };
    return (
        <SortableContext
            items={columns?.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
        >
            <Box
                sx={{
                    width: "100% ",
                    height: "100%",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                }}
            >
                {columns?.map((column) => (
                    <Column
                        key={column._id}
                        column={column}
                        columns={columns}
                    />
                ))}

                {!openNewColForm ? (
                    <Box
                        onClick={toggleOpenNewColForm}
                        sx={{
                            minWidth: "250px",
                            maxWidth: "250px",
                            mx: 2,
                            borderRadius: "6px",
                            height: "fit-content",
                            backgroundColor: "#ffffff3d",
                        }}
                    >
                        <Button
                            startIcon={<AddIcon />}
                            sx={{
                                color: "white",
                                width: "100%",
                                justifyContent: "flex-start",
                                pl: 2.5,
                                py: 1.5,
                            }}
                        >
                            ADD NEW COLUMN
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: "250px",
                            maxWidth: "250px",
                            mx: 2,
                            p: 1,
                            borderRadius: "6px",
                            height: "fit-content",
                            bgcolor: "#ffffff3d",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        <TextField
                            label="Enter column title ..."
                            variant="outlined"
                            autoFocus
                            type="text"
                            size="small"
                            value={newColTitle}
                            onChange={(e) => {
                                setNewColTitle(e.target.value);
                            }}
                            sx={{
                                "& label": { color: "white" },
                                "& input": { color: "white" },
                                "& label.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            }}
                        ></TextField>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    boxShadow: "none",
                                    border: "0.5px solid",
                                    borderColor: "#ccc",
                                }}
                                onClick={addNewColumn}
                            >
                                Add Column
                            </Button>
                            <CloseIcon
                                fontSize="small"
                                sx={{ color: "white", cursor: "pointer" }}
                                onClick={toggleOpenNewColForm}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </SortableContext>
    );
}

export default ListColumns;
