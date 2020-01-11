import React, { useEffect, useRef } from 'react';
import { IoIosPlay, IoMdPause, IoIosRefresh } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { enable, disable, reset, setSeconds, modeSession, modeBreak } from '../actions';

function getFormattedTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function TimerWrapper() {

    const globalState = useSelector(state => state);
    const dispatch = useDispatch();
    const beep = useRef(null);

    useEffect(() => {
        if (globalState.isOn && globalState.secondsLeft > 0) {
            const interval = setInterval(() => {
                dispatch(setSeconds(globalState.secondsLeft - 1));
            }, 1000);
            return () => clearInterval(interval);
        } else if (globalState.secondsLeft <= 0) {
            beep.current.currentTime = 0;
            beep.current.play();
            // Transition from session to break
            if (!globalState.isBreak) {

                dispatch(setSeconds(globalState.breakLength * 60));
                dispatch(modeBreak());

                // Break to session
            } else {
                dispatch(setSeconds(globalState.sessionLength * 60));
                dispatch(modeSession());
            }

        }
    }, [dispatch, globalState]);

    const toggleTimer = () => {
        if (globalState.isOn) dispatch(disable());
        else dispatch(enable());
    };

    const resetToDefault = () => {
        dispatch(reset());
        beep.current.pause();
        beep.current.currentTime = 0;
    };

    return (
        <>
            <div className="timer"><div className="timer-wrapper"><div id="timer-label">{globalState.isBreak ? 'Break' : 'Session'}</div>
                <div id="time-left" className={globalState.isOn ? "animated" : null}>{getFormattedTime(globalState.secondsLeft)}</div>
            </div>
            </div>
            <div className="timer-control">
                <button id="start_stop" className="pomodoro-btn" onClick={toggleTimer}>{globalState.isOn ? <IoMdPause /> : <IoIosPlay />}</button>
                <button id="reset" className="pomodoro-btn" onClick={resetToDefault}><IoIosRefresh />
                </button>
            </div>
            <audio ref={beep} id="beep" preload="auto" src="/beep.mp3"></audio>
        </>
    )
}
