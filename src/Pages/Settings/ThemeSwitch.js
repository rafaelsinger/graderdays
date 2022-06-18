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
            size={80}
            style={{width: '85px'}}
            speed={2}
        />
    )
}

export default ThemeSwitch;