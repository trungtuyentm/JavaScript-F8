import { Card as MuiCard, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { config } from "~/assets/js/config";
import { client } from "~/assets/js/client";
import { splitDataToPost } from "~/utils/splitDataToPost";
import { useState } from "react";

function Card({ card, columns }) {
    if (!card) return;
    const { SERVER_API } = config;
    client.setUrl(SERVER_API);
    const apiKey = localStorage.getItem("apiKey");
    const [editCard, setEditCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const toggleSetEditCard = () => setEditCard(!editCard);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: card._id, data: { ...card } });

    const dndKitCardStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? "1px solid #000" : undefined,
    };

    const removeCard = async () => {
        const column = columns.find((column) =>
            column.cards.map((item) => item._id)?.includes(card._id)
        );
        column.cards = column.cards.filter((item) => item._id !== card._id);
        const dataToPost = splitDataToPost(columns);
        const { data } = await client.post(`/tasks`, dataToPost, apiKey);
        if (data.status_code === "SUCCESS") {
            location.reload(500);
        }
    };

    const editCardTitle = async () => {
        if (!newCardTitle) {
            return;
        }
        const column = columns.find((column) =>
            column.cards.map((item) => item._id)?.includes(card._id)
        );
        card.title = newCardTitle;

        const dataToPost = splitDataToPost(columns);

        const { data } = await client.post(`/tasks`, dataToPost, apiKey);
        if (data.status_code === "SUCCESS") {
            location.reload(500);
        }
        toggleSetEditCard();
        setNewCardTitle("");
    };
    return (
        <>
            {!editCard ? (
                <MuiCard
                    ref={setNodeRef}
                    style={dndKitCardStyles}
                    {...attributes}
                    {...listeners}
                    sx={{
                        cursor: "pointer",
                        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                        overflow: "unset",
                        border: "1px solid transparent",

                        "&:hover": {
                            borderColor: "black",
                            "& .icon-container": {
                                display: "block",
                            },
                        },
                    }}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1.5,
                            "&:last-child": { p: 1.5 },
                        }}
                    >
                        <Typography> {card.title}</Typography>
                        <Box
                            className="icon-container"
                            sx={{ display: "none" }}
                        >
                            <IconButton
                                aria-label="Edit"
                                size="small"
                                onClick={toggleSetEditCard}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="Delete"
                                size="small"
                                onClick={removeCard}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </MuiCard>
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        my: 1,
                    }}
                >
                    <TextField
                        label="Enter task here..."
                        variant="outlined"
                        autoFocus
                        type="text"
                        size="small"
                        value={newCardTitle}
                        onChange={(e) => {
                            setNewCardTitle(e.target.value);
                        }}
                    ></TextField>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{
                                boxShadow: "none",
                                border: "0.5px solid",
                                borderColor: "#ccc",
                            }}
                            onClick={editCardTitle}
                        >
                            Add
                        </Button>
                        <CloseIcon
                            fontSize="small"
                            sx={{ color: "white", cursor: "pointer" }}
                            onClick={toggleSetEditCard}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
}

export default Card;
