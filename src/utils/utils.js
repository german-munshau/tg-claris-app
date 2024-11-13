export const getDateTime = (str) => {
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

export const getDate = (str) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    let timestamp = Date.parse(str);
    const date = new Date(timestamp);
    return date.toLocaleString("ru", options)
}

export const getCurrency = (currency) => {
    if (currency) {
        return currency.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    return null
};

const options = {
    // era: 'long',
    // year: 'numeric',
    year: 'numeric',
    // month: 'long',
    month: 'short',
    // month: 'numeric',
    day: 'numeric',
    // weekday: 'long',
    timezone: 'UTC',
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric'
};

export const getDateValue = (dateString) => {
    if (dateString) {
        const date = new Date(dateString)
        return date.toLocaleString("ru", options)
    }
    return null
};