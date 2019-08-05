import React from 'react';
import PropTypes from 'prop-types'


const FilterMenu = ({ filterValues, handleChangeCheckbox }) => {
    return (
        <div className="filterMenu">
            <span>Filter by Length: </span>
            <ul>
                {filterValues.map(item => (
                    <li key={item.id}>
                        <input
                            type="checkbox"
                            onChange={() => handleChangeCheckbox(item.id)}
                            checked={item.checked}
                        />
                        <span>{item.name}</span>
                        <div id="circ" style={{ backgroundColor: `${item.color}` }} />
                    </li>
                ))}
            </ul>
        </div>
    )
};

FilterMenu.propTypes = {
    filterValues: PropTypes.array.isRequired,
    handleChangeCheckbox: PropTypes.func.isRequired
}

export default FilterMenu;