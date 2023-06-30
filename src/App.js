import React, { useState, useEffect } from 'react';
import './App.css'; 


const PomodoroClock = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [cycles, setCycles] = useState(2);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      if (timeLeft === 0) {
        setIsRunning(false);
        if (currentCycle === cycles - 1) {
          setTimeLeft(workTime * 60);
          setCurrentCycle(0);
        } else {
          setIsRunning(true);
          setCurrentCycle((prevCycle) => prevCycle + 1);
          setTimeLeft((currentCycle + 1) % 2 === 0 ? breakTime * 60 : workTime * 60);
        }
      }

      return () => clearInterval(interval);
    }
  }, [isRunning, timeLeft, workTime, breakTime, currentCycle, cycles]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workTime * 60);
    setCurrentCycle(0);
  };

  return (
    <div className="pomodoro-clock" >
      <div className="timer">
        {currentCycle % 2 === 0 ? <h2>Work Time</h2> : <h2>Break Time</h2>}
        <div className="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div className="settings">
        <label>
          Work Time (minutes):
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type="number"
            value={breakTime}
            onChange={(e) => setBreakTime(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Cycles:
          <input
            type="number"
            value={cycles}
            onChange={(e) => setCycles(parseInt(e.target.value))}
            min="1"
          />
        </label>
      </div>
    </div>
  );
};

export default PomodoroClock;
