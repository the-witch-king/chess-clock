const DECIMAL_PLACES = 2

export type TimerDisplayProps = {
    timeToDisplay: number | undefined
    onClick: () => void
}

export const TimerDisplay = ({
    timeToDisplay,
    onClick,
}: TimerDisplayProps): JSX.Element => (
    <h2 onClick={onClick}>
        {timeToDisplay === 0 || timeToDisplay
            ? timeToDisplay.toFixed(DECIMAL_PLACES)
            : ' - '}
    </h2>
)
