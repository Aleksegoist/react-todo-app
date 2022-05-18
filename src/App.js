import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';

function App() {
    const [item, setItem] = useState('');
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem('items')) || []
    );

    useEffect(() => {
        localStorage.setItem('item', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (item.trim() !== '') {
            const newItem = {
                id: uuidv4(),
                item: item,
                color: randomColor({ luminosity: 'light' }),
                defaultPos: {
                    x: 500,
                    y: -500,
                },
            };
            setItems((items) => [...items, newItem]);
            setItem('');
        } else {
            alert('Enter something');
            setItem('');
        }
    };

    const deleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updatePos = (data, index) => {
        let newArray = [...items];
        newArray[index].defaultPos = { x: data.x, y: data.y };
        setItems(newArray);
    };

    const keyPress = (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            addItem();
        }
    };

    return (
        <div className='App'>
            <div className='wrapper'>
                <input
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    type='text'
                    placeholder='What do you want to do...'
                    onKeyPress={(e) => keyPress(e)}
                />
                <button onClick={addItem} className='addBtn'>
                    ADD
                </button>
            </div>
            {items.map((item, index) => {
                return (
                    <Draggable
                        key={index}
                        defaultPosition={item.defaultPos}
                        onStop={(_, data) => {
                            updatePos(data, index);
                        }}
                    >
                        <div
                            className='todo__item'
                            style={{ backgroundColor: item.color }}
                        >
                            {`${item.item}`}
                            <button
                                onClick={() => deleteItem(item.id)}
                                className='delete'
                            >
                                X
                            </button>
                        </div>
                    </Draggable>
                );
            })}
        </div>
    );
}

export default App;
