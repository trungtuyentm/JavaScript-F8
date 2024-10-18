export const mergeDataToBoard = (columns, tasks) => {
    const boardData = {
        _id: "board-id-01",
        title: "Bang 01",
        description: "mo ta bang",
        type: "public",
        ownerIds: [],
        memberIds: [],
        columnOrderIds: [],
        columns: [],
    };

    boardData.columnOrderIds = columns.map((column) => column._id);

    boardData.columns = columns.map((column) => {
        const columnData = {
            _id: column._id,
            boardId: "board-id-01",
            title: column.columnName,
            column: column.column,
            cardOrderIds: [],

            cards: tasks
                .filter((task) => task.column === column.column)
                .map((task) => ({
                    _id: task._id,
                    boardId: "board-id-01",
                    columnId: column._id,
                    column: task.column,
                    title: task.content,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt,
                })),
        };

        columnData.cardOrderIds = columnData.cards.map((card) => card._id);

        return columnData;
    });

    return boardData;
};
