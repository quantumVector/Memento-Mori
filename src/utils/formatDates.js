let decCache = [],
    decCases = [2, 0, 1, 1, 1, 2];

function decOfNum(number, titles) {
    if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
}

export const formateDates = (years, months, days) => {
    if (years !== 0 && months !== 0 && days !== 0) {
        return `
            ${years} ${decOfNum(years, ['год', 'года', 'лет'])},
            ${months} ${decOfNum(months, ['месяц', 'месяца', 'месяцев'])}
            и 
            ${days} ${decOfNum(days, ['день', 'дня', 'дней'])}
        `;
    }

    if (years !== 0 && months === 0 && days === 0) {
        return `${years} ${decOfNum(years, ['год', 'года', 'лет'])}`;
    }

    if (years !== 0 && months === 0 && days !== 0) {
        return `
            ${years} ${decOfNum(years, ['год', 'года', 'лет'])}
            и 
            ${days} ${decOfNum(days, ['день', 'дня', 'дней'])}
        `;
    }

    if (years === 0 && months !== 0 && days !== 0) {
        return `
            ${months} ${decOfNum(months, ['месяц', 'месяца', 'месяцев'])}
            и 
            ${days} ${decOfNum(days, ['день', 'дня', 'дней'])}
        `;
    }

    if (years === 0 && months === 0 && days !== 0) {
        return `
            ${days} ${decOfNum(days, ['день', 'дня', 'дней'])}
        `;
    }

    if (years !== 0 && months !== 0 && days === 0) {
        return `
            ${years} ${decOfNum(years, ['год', 'года', 'лет'])}
            и 
            ${months} ${decOfNum(months, ['месяц', 'месяца', 'месяцев'])}
        `;
    }
};