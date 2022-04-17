import React from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
    const { open, close } = props;

    return (
        <div className={open ? 'openDropdown dropdown' : 'dropdown'}>
            {open ? (
                <ul className="dripdownList">
                    <li className="listItem" onClick={() => { close('정책');}}>정책</li>
                    <li className="listItem" onClick={() => { close('생활백서');}}>생활백서</li>
                    <li className="listItem" onClick={() => { close('OTT구독');}}>OTT구독</li>
                    <li className="listItem" onClick={() => { close('공동구매');}}>공동구매</li>
                </ul>
            ) : null}
        </div>
    );
}
export default Dropdown;