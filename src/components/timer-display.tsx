import styled from 'styled-components'
import { TimerDisplayProps } from '../types'

const Button = styled.button`
    width: 50%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 10vmin;

    &:first-of-type {
        background-color: ${({ theme }) => theme.colors.pink};
        color: ${({ theme }) => theme.colors.black};
    }

    &:nth-of-type(2) {
        background-color: ${({ theme }) => theme.colors.blue};
        color: ${({ theme }) => theme.colors.black};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        flex-grow: 1;
        width: 100%;
        &:first-of-type(1) {
            transform: rotateZ(180deg);
        }
    }
`

export const TimerDisplay = ({
    time,
    onClick,
}: TimerDisplayProps): JSX.Element => {
    if (time <= 0)
        return (
            <Button type="button" disabled>
                {'Time over!'}
            </Button>
        )

    const displayMinutes: number = Math.floor(time / 60)
    const displaySeconds: number = Math.floor(time % 60)

    const display = `${displayMinutes}:${displaySeconds
        .toFixed(0)
        .padStart(2, '0')}`

    return (
        <Button type="button" onClick={onClick}>
            {display}
        </Button>
    )
}
