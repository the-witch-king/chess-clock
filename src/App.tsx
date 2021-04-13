import { useState } from 'react'
import './App.css'
import { Timer } from './classes/timer'

function App() {
    const [state, setState] = useState<{ timer: Timer }>({
        timer: new Timer(),
    })

    const startTimer = () => {
        state.timer.start(setState)
        setState({ timer: state.timer })
    }

    const stopTimer = () => {
        state.timer.stop()
        setState({ timer: state.timer })
    }

    return (
        <>
            <h1>{state.timer.timeRemaining.toFixed(0)}</h1>
            <button onClick={startTimer}>Start timer!</button>
            <button onClick={stopTimer}>Stop timer!</button>
        </>
    )
}

export default App
