import React, { useState } from 'react';
import '../styles/ChipInput.css'; 

const ChipInput = () => {
  const [showItems, setshowItems] = useState(false); //State to hide items until input is clicked
  const [inputValue, setInputValue] = useState(''); // State to track the value entered in the input field
  const [chips, setChips] = useState([]); // State to track the selected Chips

  
  const url="https://i2-prod.mirror.co.uk/incoming/article803831.ece/ALTERNATES/s1227b/Christian%20Bale%20as%20Batman%20in%20Batman%20Begins";
  const itemList = [
    { id: '1', label: 'Item 1', imageUrl: url },
    { id: '2', label: 'Item 2', imageUrl: url },
    { id: '3', label: 'Item 3', imageUrl: url },
    { id: '4', label: 'Item 4', imageUrl: url },
    { id: '5', label: 'Item 5', imageUrl: url },
    { id: '11', label: 'Item 11', imageUrl: url },
    { id: '22', label: 'Item 22', imageUrl: url },
    { id: '333', label: 'Item 333', imageUrl: url },
    { id: '444', label: 'Item 444', imageUrl: url },
    { id: '5555', label: 'Item 5555', imageUrl: url },
  ];

  // function to show items when input is clicked 
  const showAllItems = () => {
    setshowItems(true);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setInputValue('');
  };

  const handleChipRemove = (chipId) => {
    setChips(chips.filter((chip) => chip.id !== chipId));
  };

  
//to highlight chip item on first backspace and remove it on 2nd backspace
  const handleInputKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      if (!lastChip.markedForRemoval) {
        setChips(
          chips.map((chip, index) =>
            index === chips.length - 1 ? { ...chip, markedForRemoval: true } : chip
          )
        );
      } else {
        setChips(chips.filter((chip) => !chip.markedForRemoval));
      }
    } else {
      setChips(chips.map((chip) => ({ ...chip, markedForRemoval: false })));
    }
  };

  return (
    <div className="chip-input-container">
      <div className="chips">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className={`chip${chip.markedForRemoval ? ' highlight' : ''}`}
          >
            <img src={chip.imageUrl} alt={chip.label} className="chip-image" />
            {chip.label}
            <span className="remove-icon" onClick={() => handleChipRemove(chip.id)}>
              X
            </span>
          </div>
        ))}
      </div>
      <div>
      <input
       className="input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={showAllItems}
        onKeyDown={handleInputKeyDown}
        placeholder="Type here..."
      />
      {showItems && (
        <ul className="item-list">
          {itemList
            .filter((item) => !chips.find((chip) => chip.label.toLowerCase() === item.label.toLowerCase()))
            .filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)}>
                <img src={item.imageUrl} alt={item.label} className="list-item-image" />
                {item.label}
              </li>
            ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ChipInput;