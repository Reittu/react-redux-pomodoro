import React from 'react';
import { IconContext } from 'react-icons';
import { LengthController } from './LengthController';
import { TimerWrapper } from './TimerWrapper';
import './Pomodoro.css';

function Pomodoro() {

    return (
        <IconContext.Provider value={{ className: 'react-icons' }}>
            <div className="pomodoro-wrapper">
                <div className="pomodoro-container">
                    <h1 className="title">Pomodoro Clock</h1>
                    <LengthController mode="break" />
                    <LengthController mode="session" />
                    <TimerWrapper />
                </div>
            </div>
        </IconContext.Provider>
    );
}

export default Pomodoro;
