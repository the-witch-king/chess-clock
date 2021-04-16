import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #985f99;
    width: 100vw;
    height: 100vh;
`
const Content = styled.div`
    max-width: 50%;
    margin: auto;
    padding: 5em;
`

const Header = styled.h1`
    font-size: 5vmax;
    margin-top: 0;
`
const Intro = styled.p``

const SubHeader = styled.h2`
    font-size: 2.5vmax;
`
const FieldSet = styled.fieldset`
    display: flex;
    min-width: 10vw;
    justify-content: space-between;
    border: none;
`

const StartButton = styled.button`
    font-size: 2.5vmax;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #3083dc;
    padding: 0.5em 1em;
    display: block;
    margin: auto;
`

export const Settings = ({
    toggleViews,
    setSettings,
}: {
    toggleViews: () => void
    setSettings: (settings: any) => void
}) => {
    const [clockAmount, setClockAmount] = useState(100)
    const [increaseAmount, setIncreaseAmount] = useState(0)

    const handleFormSubmit = () => {
        setSettings((settings: any) => ({
            ...settings,
            startingTime: clockAmount,
            increaseAmount: increaseAmount,
        }))
        toggleViews()
    }
    const handleClockAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setClockAmount(+event.target.value)
    }

    const handleIncreaseAmountChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setIncreaseAmount(+event.target.value)
    }

    return (
        <Wrapper>
            <Content>
                <Header>A Chess Clock</Header>
                <Intro>Welcome!</Intro>
                <SubHeader>Settings</SubHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleFormSubmit()
                    }}
                >
                    <FieldSet>
                        <label htmlFor="timeInput">Clock Time Amount:</label>
                        <input
                            id="timeInput"
                            type="number"
                            value={clockAmount}
                            onChange={handleClockAmountChange}
                        />
                    </FieldSet>
                    <FieldSet>
                        <label htmlFor="increaseAmount">
                            Time to add on toggle:
                        </label>
                        <input
                            id="increaseAmount"
                            type="number"
                            value={increaseAmount}
                            onChange={handleIncreaseAmountChange}
                        />
                    </FieldSet>

                    <StartButton type="submit">Begin!</StartButton>
                </form>
            </Content>
        </Wrapper>
    )
}
