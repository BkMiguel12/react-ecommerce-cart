export const countDuplicatesFromArray = (value, array) => {
    return array.filter(item => item === value).length;
}

export const removeDuplicatesFromArray = array => {
    return [...new Set(array)];
}

export const removeItemFromArray = (item, array) => {
    return array.filter(i => i !== item);
}