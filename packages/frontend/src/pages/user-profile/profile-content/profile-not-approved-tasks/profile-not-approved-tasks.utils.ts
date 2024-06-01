export const getPrettyDateFromTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(
        2,
        '0'
    )}.${String(date.getFullYear()).padStart(2, '0')}`;
};
