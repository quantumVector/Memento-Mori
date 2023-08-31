import React, { forwardRef, useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Button, FormHelperText, OutlinedInput } from '@mui/material';
import styles from './Steps.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setDays, setEnd, setMonths, setStart, setStep, setYears } from './store/datesSlice';
import { LocalDate, Period } from '@js-joda/core';
import { formateDates } from './utils/formatDates';

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="00.00.0000"
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
        />
    );
});

const Steps = () => {
    const dispatch = useDispatch();

    const step = useSelector((state) => state.dates.step);
    const start = useSelector((state) => state.dates.start);

    const [label, setLabel] = useState('');
    const [value, setValue] = useState('');
    const [provided, setProvided] = useState(false);
    const [info, setInfo] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (step === 1) {
            setLabel('Укажите дату своего рождения');
        }

        if (step === 2) {
            setValue('');
            setProvided(false);
            setLabel('Предположите, когда вы умрете');
        }
    }, [step]);

    const handleChange = (event) => {
        const inputValue = event.target.value;

        setValue(inputValue);

        if (step === 1 && inputValue.length === 10) setProvided(true);
        if (step === 2 && inputValue.length !== 10) {
            setError(false);
            setInfo('');
        }
        if (step === 2 && inputValue.length === 10) {
            setProvided(true);

            try {
                const startDateStr = start;
                const endDateStr = inputValue;

                const startDateArr = startDateStr.split('.');
                const endDateArr = endDateStr.split('.');

                const startDate = LocalDate.of(+startDateArr[2], +startDateArr[1], +startDateArr[0]);
                const endDate = LocalDate.of(+endDateArr[2], +endDateArr[1], +endDateArr[0]);

                const period = Period.between(startDate, endDate);

                const currentDate = LocalDate.now();

                if (!endDate.isAfter(currentDate)) throw new Error();

                dispatch(setYears(period._years));
                dispatch(setMonths(period._months));
                dispatch(setDays(period._days));

                setInfo(`Ваш возраст к тому времени будет составлять ${formateDates(period._years, period._months, period._days)}`);
                setError(false);
            } catch (e) {
                setError(true);
                setInfo('Некорректное значение даты');
            }
        }
    };

    const handleSubmite = () => {
        if (step === 1) {
            dispatch(setStart(value));
            dispatch(setStep(2));
        }

        if (step === 2) {
            dispatch(setEnd(value));
            dispatch(setStep(3));
        }
    }

    return (
        <div className={styles.steps}>
            <div className={styles.steps__wrapper}>
                <h3 className={styles.steps__label}>{label}</h3>
                <OutlinedInput
                    value={value}
                    onChange={handleChange}
                    name="textmask"
                    placeholder='DD.MM.YYYY'
                    inputComponent={TextMaskCustom}
                    style={{ fontSize: '2rem' }}
                    fullWidth
                    error={error}
                />
                {provided && info && (
                    <FormHelperText error={error}>
                        {info}
                    </FormHelperText>
                )}
            </div>
            <Button
                variant="contained"
                size="large"
                disabled={provided && !error ? false : true}
                onClick={handleSubmite}>
                Далее
            </Button>
        </div>
    )
}

export default Steps;