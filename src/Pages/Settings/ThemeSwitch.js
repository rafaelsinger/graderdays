import React, {useEffect, useState} from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';

const ThemeSwitch = ({switchTheme}) => { 
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === '"dark"' ? true : false);

    const handleChange = () => {
        isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true);
        switchTheme();
    }

    return(
        <DarkModeToggle 
            onChange={handleChange}
            checked={isDarkMode}
            size={60} //75
            style={{width: '85px'}}
            speed={2}
            className={'darkModeToggle'}
        />
    )
}

export default ThemeSwitch;