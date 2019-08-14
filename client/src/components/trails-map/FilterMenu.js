import React from 'react';
import PropTypes from 'prop-types'


const FilterMenu = ({ filterValues, handleChangeCheckbox }) => {
    return (
        <div className="dropdown" >
            <div className="mapBtn map1" >Filter</div>
            <div className="dropdown-content drop1">
                <span>Filter by Length: </span>
                <ul>
                    {filterValues.map((item, index) => (
                        <li key={index} onClick={() => handleChangeCheckbox(item.id)}>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                readOnly
                            />
                            <span>{item.name}</span>
                            <div id="circ" style={{ backgroundColor: `${item.color}` }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

FilterMenu.propTypes = {
    filterValues: PropTypes.array.isRequired,
    handleChangeCheckbox: PropTypes.func.isRequired
}

export default FilterMenu;