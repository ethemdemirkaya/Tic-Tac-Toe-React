import React, {useRef, useState} from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const boxesRef = useRef([]);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (data[num] === "x" || data[num] === "o") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="${cross_icon}" />`;
            data[num] = "x";
            setCount(count + 1);
        } else {
            e.target.innerHTML = `<img src="${circle_icon}" />`;
            data[num] = "o";
            setCount(count + 1);
        }
        checkWin(data);
    };

    const checkWin = (currentData) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                setLock(true);
                won(currentData[a]);
                return;
            }
        }
    };

    const reset = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
        boxesRef.current.forEach(box => box.innerHTML = "");
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src="${cross_icon}" alt="cross" /> Wins`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src="${circle_icon}" alt="circle" /> Wins`;
        }
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={el => boxesRef.current[0] = el} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={el => boxesRef.current[1] = el} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={el => boxesRef.current[2] = el} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={el => boxesRef.current[3] = el} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={el => boxesRef.current[4] = el} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={el => boxesRef.current[5] = el} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={el => boxesRef.current[6] = el} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={el => boxesRef.current[7] = el} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={el => boxesRef.current[8] = el} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
