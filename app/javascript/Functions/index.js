export const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1)
}

export const styleDate = (str) => {
    const d = new Date(str);
    return d.toDateString()
}