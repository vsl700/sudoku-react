import React, { createContext, useContext, useState } from 'react';
import './SudokuBoard.css';

const SudokuContext = createContext(-1);

function SudokuBoard() {
    const [ selected, setSelected ] = useState(-1);

    const onFieldClicked = (id: number) => {
        setSelected(id);
    }

    return (
        <div className='Sudoku-board'>
            {/* If you click outside of all Sudoku fields, it should unselect them */}
            <div className='Sudoku-bg' onClick={() => setSelected(-1)}/>
            {/* Sudoku Context for selected field */}
            <SudokuContext.Provider value={selected}>
                {/* The actual Sudoku grid */}
                <div className='Sudoku-grid'>
                    <Square3x3 startId={0} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={9} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={18} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={27} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={36} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={45} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={54} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={63} onFieldClicked={onFieldClicked} />
                    <Square3x3 startId={72} onFieldClicked={onFieldClicked} />
                </div>
            </SudokuContext.Provider>
        </div>
    );
}

const Square3x3 = (props: {startId: number, onFieldClicked: (fieldId: number) => void}) => {
    let startId = props.startId;

    return (
        <div className='Sudoku-3x3-square'>
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
            <SquareField id={startId++} onClicked={props.onFieldClicked} />
        </div>
    )
}

const SquareField = (props: {id: number, onClicked: (fieldId: number) => void}) => {
    const [ number, setNumber ] = useState(0);
    const selected = useContext(SudokuContext);

    const isSelected = () => selected === props.id;

    const keyPressed = (e: React.KeyboardEvent) => {
        if(!isSelected()) return;

        setNumber(parseInt(e.key));
    }

    return (
        <div className={`Sudoku-field${isSelected() ? ' selected': ' '}`} tabIndex={0} onKeyDown={keyPressed} onClick={() => props.onClicked(props.id)}>
            {number !== 0 ? number : ''}
        </div>
    )
}

export default SudokuBoard;
