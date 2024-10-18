import { Box } from "@mui/material";
import Card from "./Card/Card";
const COL_HEADER = "50px";
const COL_FOOTER = "56px";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
function ListCards({ cards, columns }) {
    return (
        <SortableContext
            items={cards?.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: "0 5px",
                    m: "0 5px",
                    overflowX: "hidden",
                    overflowY: "auto",
                    maxHeight: `calc( calc( 100vh - 48px ) - 40px - ${COL_HEADER} - ${COL_FOOTER})`,
                }}
            >
                {cards?.map((card) => (
                    <Card key={card._id} card={card} columns={columns} />
                ))}
            </Box>
        </SortableContext>
    );
}

export default ListCards;
