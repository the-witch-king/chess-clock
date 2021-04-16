import styled from 'styled-components'

const DECIMAL_PLACES = 2

export type TimerDisplayProps = {
    timeToDisplay: number | undefined
    onClick: () => void
}

const Button = styled.button`
    width: 50%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 10vmin;
    &:first-of-type {
        background-color: #506c64;
        color: #cdd3d5;
    }
    &:nth-of-type(2) {
        background-color: #75b8c8;
        color: #220c10;
    }
`

const buildDisplayString = (time: number): string => {
    const displayMinutes: number = Math.floor(time / 60)
    const displaySeconds: number = time % 60
    return `${displayMinutes}:${displaySeconds.toFixed(0).padStart(2, '0')}`
}

export const TimeDisplay = ({
    timeToDisplay,
    onClick,
}: TimerDisplayProps): JSX.Element => {
    const display = timeToDisplay
        ? timeToDisplay <= 0
            ? 0
            : buildDisplayString(timeToDisplay)
        : '-'

    return (
        <Button type="button" onClick={onClick}>
            {display}
        </Button>
    )
}
