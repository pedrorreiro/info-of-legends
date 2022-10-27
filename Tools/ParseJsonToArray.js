export const parseJsonToArray = (json) => {
    const array = [];

    for (let key in json) {
        array.push(json[key]);
    }

    return array;
}