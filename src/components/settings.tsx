import { ChangeEvent, useState } from 'react'

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
        <>
            <h1>Settings</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleFormSubmit()
                }}
            >
                <label htmlFor="timeInput">Clock Time Amount:</label>
                <input
                    id="timeInput"
                    type="number"
                    value={clockAmount}
                    onChange={handleClockAmountChange}
                />
                <fieldset>
                    <label htmlFor="increaseAmount">
                        Time to add on toggle:{' '}
                    </label>
                    <input
                        id="increaseAmount"
                        type="number"
                        value={increaseAmount}
                        onChange={handleIncreaseAmountChange}
                    />
                </fieldset>

                <button type="submit">Begin!</button>
            </form>
        </>
    )
}
