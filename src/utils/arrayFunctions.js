export const countDuplicatesFromArray = (value, array) => {
    return array.filter(item => item === value).length;
}

export const removeDuplicatesFromArray = array => {
    return [...new Set(array)];
}

export const removeItemFromArray = (item, array) => {
    const elementToDelete = array.find(i => i === item);
    array.splice(array.indexOf(elementToDelete), 1);
    return array;
}