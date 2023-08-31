import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Result.module.scss';
import { parseDate } from './utils/parseDate';
import cn from 'classnames';
import Tooltip from '@mui/material/Tooltip';

const Result = () => {
    const start = useSelector((state) => state.dates.start);
    const end = useSelector((state) => state.dates.end);

    const [cellsData, setCellsData] = useState([]);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    useEffect(() => {
        const startDate = parseDate(start);
        const endDate = parseDate(end);

        const yearsArray = [];
        let currentDate = new Date(startDate);

        const startMonthIndex = startDate.getMonth();
        const endMonthIndex = endDate.getMonth();

        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();

            let months;
            if (yearsArray.length === 0) {
                months = monthsArray.slice(startMonthIndex);
            } else if (currentDate.getFullYear() === endDate.getFullYear()) {
                months = monthsArray.slice(0, endMonthIndex + 1);
            } else {
                months = monthsArray;
            }

            yearsArray.push({
                year,
                months,
            });

            currentDate.setYear(year + 1);
            currentDate.setMonth(0);
        }

        setCellsData(yearsArray);
    }, []);

    const setBlueColor = (year, monthName) => {
        const monthIndex = monthsArray.findIndex(month => month === monthName);

        if (year < currentYear) return true;
        if (year === currentYear && monthIndex <= currentMonth) return true;

        return false;
    }

    return (
        <div className={styles.result}>
            {cellsData && cellsData.map((item, index) => (
                <div key={index} className={styles.result__wrap}>
                    <p className={styles.result__title}>{item.year}</p>
                    <div className={styles.result__cells}>
                        {item.months.map((month, index) => (
                            <Tooltip title={`${month} ${item.year} `} followCursor key={index}>
                                <div className={cn(styles.result__cell, {
                                    [styles.result__blue]: setBlueColor(item.year, month),
                                })}></div>
                            </Tooltip>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Result;