export const getDate = (str) => {
    const options = {
        // era: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    let timestamp = Date.parse(str);
    const date = new Date(timestamp);
    return date.toLocaleString("ru", options)
}

export const getDateTime = (str) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let timestamp = Date.parse(str);
    const date = new Date(timestamp);
    return date.toLocaleString("ru", options)
}
