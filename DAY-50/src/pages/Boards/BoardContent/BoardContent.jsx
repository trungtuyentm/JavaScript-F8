import { Box } from "@mui/material";
import "./style.css";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
} from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep, split } from "lodash";
import { splitDataToPost } from "~/utils/splitDataToPost";
import { client } from "~/assets/js/client";
import { config } from "~/assets/js/config";
import { mergeDataToBoard } from "~/utils/mergeData";
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
    CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};
function BoardContent() {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });
    const sensors = useSensors(pointerSensor);
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    const [oldColumn, setOldClumn] = useState(null);
    const [dataPost, setDataPost] = useState([]);

    const { SERVER_API } = config;
    client.setUrl(SERVER_API);
    const apiKey = localStorage.getItem("apiKey");
    const [board, setBoard] = useState({});
    const getData = async () => {
        const { data } = await client.get("/tasks", apiKey);
        if (data.status_code === "SUCCESS") {
            const { columns, tasks } = data.data;
            setBoard(mergeDataToBoard(columns, tasks));
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!board) {
            return;
        }
        setOrderedColumns(
            mapOrder(board?.columns, board?.columnOrderIds, "_id")
        );
    }, [board]);

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((column) =>
            column.cards.map((card) => card._id)?.includes(cardId)
        );
    };
    const handleDragStart = (e) => {
        setActiveDragItemId(e?.active.id);
        setActiveDragItemType(
            e.active.data?.current?.columnId
                ? ACTIVE_DRAG_ITEM_TYPE.CARD
                : ACTIVE_DRAG_ITEM_TYPE.COLUMN
        );
        setActiveDragItemData(e.active.data?.current);
        if (e.active.data?.current?.columnId) {
            setOldClumn(findColumnByCardId(e?.active.id));
        }
    };
    const hanldeDragOver = (e) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
        const { active, over } = e;
        if (!active || !over) return;
        const {
            id: activeDraggingCardId,
            data: { current: activeDraggingCardData },
        } = active;
        const { id: overCardId } = over;

        const activeColumn = findColumnByCardId(activeDraggingCardId);
        const overColumn = findColumnByCardId(overCardId);
        if (!activeColumn || !overColumn) return;
        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns((prevColumns) => {
                const overCardIndex = overColumn?.cards.findIndex(
                    (card) => card._id === overCardId
                );
                let newCardIndex;
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                        over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;
                newCardIndex =
                    overCardIndex >= 0
                        ? overCardIndex + modifier
                        : orderedColumns.cards.length + 1;

                const nextColumns = cloneDeep(prevColumns);
                const nextActiveColumn = nextColumns.find(
                    (column) => column._id === activeColumn._id
                );
                const nextOverColumn = nextColumns.find(
                    (column) => column._id === overColumn._id
                );
                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
                        (card) => card._id
                    );
                }
                if (nextOverColumn) {
                    nextOverColumn.cards = nextOverColumn.cards.filter(
                        (card) => card._id !== activeDraggingCardId
                    );
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                        newCardIndex,
                        0,
                        activeDraggingCardData
                    );
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                        (card) => card._id
                    );
                }
                return nextColumns;
            });
        }
    };
    const handleDragEnd = (e) => {
        const { active, over } = e;

        if (!active || !over) return;

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const {
                id: activeDraggingCardId,
                data: { current: activeDraggingCardData },
            } = active;
            const { id: overCardId } = over;

            const activeColumn = findColumnByCardId(activeDraggingCardId);
            const overColumn = findColumnByCardId(overCardId);
            if (!activeColumn || !overColumn) return;

            if (oldColumn._id !== overColumn._id) {
                setOrderedColumns((prevColumns) => {
                    const overCardIndex = overColumn?.cards.findIndex(
                        (card) => card._id === overCardId
                    );
                    let newCardIndex;
                    const isBelowOverItem =
                        active.rect.current.translated &&
                        active.rect.current.translated.top >
                            over.rect.top + over.rect.height;
                    const modifier = isBelowOverItem ? 1 : 0;
                    newCardIndex =
                        overCardIndex >= 0
                            ? overCardIndex + modifier
                            : orderedColumns.cards.length + 1;

                    const nextColumns = cloneDeep(prevColumns);
                    const nextActiveColumn = nextColumns.find(
                        (column) => column._id === activeColumn._id
                    );
                    const nextOverColumn = nextColumns.find(
                        (column) => column._id === overColumn._id
                    );
                    if (nextActiveColumn) {
                        nextActiveColumn.cards = nextActiveColumn.cards.filter(
                            (card) => card._id !== activeDraggingCardId
                        );
                        nextActiveColumn.cardOrderIds =
                            nextActiveColumn.cards.map((card) => card._id);
                    }
                    if (nextOverColumn) {
                        nextOverColumn.cards = nextOverColumn.cards.filter(
                            (card) => card._id !== activeDraggingCardId
                        );
                        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
                            newCardIndex,
                            0,
                            activeDraggingCardData
                        );
                        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
                            (card) => card._id
                        );
                        nextOverColumn.cards.find(
                            (card) => card._id === activeDragItemId
                        ).column = overColumn.column;
                    }
                    postColumns(splitDataToPost(nextColumns));
                    return nextColumns;
                });
            } else {
                const oldCardIndex = oldColumn.cards.findIndex(
                    (c) => c._id === activeDragItemId
                );
                const newCardIndex = overColumn.cards.findIndex(
                    (c) => c._id === overCardId
                );
                const dndOrderCards = arrayMove(
                    oldColumn?.cards,
                    oldCardIndex,
                    newCardIndex
                );
                setOrderedColumns((prevColumns) => {
                    const nextColumns = cloneDeep(prevColumns);
                    const targetColumn = nextColumns.find(
                        (c) => c._id === overColumn._id
                    );

                    targetColumn.cards = dndOrderCards;
                    targetColumn.cardOrderIds = dndOrderCards.map((i) => i._id);

                    postColumns(splitDataToPost(nextColumns));
                    return nextColumns;
                });
            }
        }
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldIndex = orderedColumns.findIndex(
                    (c) => c._id === active.id
                );
                const newIndex = orderedColumns.findIndex(
                    (c) => c._id === over.id
                );

                const dndOrderColumns = arrayMove(
                    orderedColumns,
                    oldIndex,
                    newIndex
                );

                postColumns(splitDataToPost(dndOrderColumns));
                setOrderedColumns(dndOrderColumns);
            }
        }
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldClumn(null);
    };
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: "0.5",
                },
            },
        }),
    };

    const postColumns = async (columns) => {
        const { data } = await client.post(`/tasks`, columns, apiKey);
        if (data.status_code === "SUCCESS") {
            const { columns, tasks } = data.data;
            setBoard(mergeDataToBoard(columns, tasks));
        }
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={hanldeDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Box
                sx={{
                    backgroundColor: "primary.main",
                    width: "100%",
                    height: "calc(100vh - 48px)",
                    p: "10px 0",
                }}
            >
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column column={activeDragItemData} />
                    )}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card card={activeDragItemData} />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
