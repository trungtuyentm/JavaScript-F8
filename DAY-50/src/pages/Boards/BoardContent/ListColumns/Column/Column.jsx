import { Box, Button, Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCardIcon from "@mui/icons-material/AddCard";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { splitDataToPost } from "~/utils/splitDataToPost";
import { client } from "~/assets/js/client";
import { config } from "~/assets/js/config";
const COL_HEADER = "50px";
const COL_FOOTER = "56px";
function Column({ column, columns }) {
    const { SERVER_API } = config;
    client.setUrl(SERVER_API);
    const apiKey = localStorage.getItem("apiKey");

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: "100%",
        opacity: isDragging ? 0.75 : undefined,
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");
    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);
    const [newCardTitle, setNewCardTitle] = useState("");
    const addNewCard = async () => {
        if (!newCardTitle) {
            return;
        }

        const newCard = {
            content: newCardTitle,
            column: column.column,
            columnName: column.title,
        };

        const dataToPost = splitDataToPost(columns);
        dataToPost.push(newCard);

        const { data } = await client.post(`/tasks`, dataToPost, apiKey);
        if (data.status_code === "SUCCESS") {
            location.reload(500);
        }
        toggleOpenNewCardForm();
        setNewCardTitle("");
    };
    return (
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
                    minWidth: "300px",
                    maxWidth: "300px",
                    backgroundColor: "#ebecf0",
                    ml: 2,
                    borderRadius: "6px",
                    height: "fit-content",
                    maxHeight: `calc( calc( 100vh - 48px ) - 40px)`,
                }}
            >
                <Box
                    sx={{
                        height: COL_HEADER,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6">{column?.title}</Typography>
                    <DeleteOutlineIcon />
                </Box>
                <ListCards cards={orderedCards} columns={columns} />
                <Box
                    sx={{
                        height: COL_FOOTER,
                        p: 2,
                    }}
                >
                    {!openNewCardForm ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                height: "100%",
                            }}
                        >
                            <Button
                                startIcon={<AddCardIcon />}
                                onClick={toggleOpenNewCardForm}
                            >
                                Add new card
                            </Button>
                            <Tooltip title="Drag to move">
                                <DragHandleIcon sx={{ cursor: "pointer" }} />
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <TextField
                                label="Enter card title..."
                                variant="outlined"
                                autoFocus
                                type="text"
                                size="small"
                                value={newCardTitle}
                                onChange={(e) => {
                                    setNewCardTitle(e.target.value);
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
                                    onClick={addNewCard}
                                >
                                    Add
                                </Button>
                                <CloseIcon
                                    fontSize="small"
                                    sx={{ color: "white", cursor: "pointer" }}
                                    onClick={toggleOpenNewCardForm}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </div>
    );
}

export default Column;
