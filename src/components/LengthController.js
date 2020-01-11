import React from 'react';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { setSession, setBreak, setSeconds } from '../actions';

export function LengthController(props) {

    const isOn = useSelector(state => state.isOn);
    const isBreak = useSelector(state => state.isBreak);
    const breakLength = useSelector(state => state.breakLength);
    const sessionLength = useSelector(state => state.sessionLength);
    const dispatch = useDispatch();
    const currentVal = (props.mode === 'break' ? breakLength : sessionLength);

    const lengthSetter = (type, val) => {
        if (!isOn) {
            
            const newVal = currentVal + val;
            if (newVal >= 1 && newVal <= 60) {
                // Also update current timer if the mode is same as current
                if ((isBreak && props.mode === 'break') || (!isBreak && props.mode === 'session')) {
                    dispatch(setSeconds(newVal * 60));
                }
                if (props.mode === 'break') {
                    dispatch(setBreak(newVal));
                } else {
                    dispatch(setSession(newVal))
                }
            }
        }
    }

    return (
        <div className="length-control">
            <div id={props.mode + "-label"}>{props.mode} length</div>
            <button id={props.mode + "-increment"} className="btn-level pomodoro-btn" value="+" onClick={() => lengthSetter(props.mode + 'Length', 1)}><IoMdArrowRoundUp /></button>
            <div id={props.mode + "-length"} className="btn-level">{currentVal}</div>
            <button id={props.mode + "-decrement"} className="btn-level pomodoro-btn" value="-" onClick={() => lengthSetter(props.mode + 'Length', -1)}><IoMdArrowRoundDown /></button>
        </div>
    )
}

// props: currentVal, lengthSetter