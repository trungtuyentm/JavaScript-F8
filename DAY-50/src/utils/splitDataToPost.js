export const splitDataToPost = (columns) => {
    const result = [].concat(
        ...columns.map((column) =>
            column?.cards.map((card) => ({
                content: card.title,
                column: card.column,
                columnName: column.title,
            }))
        )
    );
    return result;
};
