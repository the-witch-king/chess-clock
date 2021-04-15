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

export const TimerDisplay = ({
    timeToDisplay,
    onClick,
}: TimerDisplayProps): JSX.Element => {
    const display = timeToDisplay
        ? timeToDisplay <= 0
            ? 0
            : timeToDisplay.toFixed(DECIMAL_PLACES)
        : '-'

    return (
        <Button type="button" onClick={onClick}>
            {display}
        </Button>
    )
}
