import React from "react";
import { useState } from "react";
const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);

        document.body.classList.toggle('dark-theme');
    };
    return (
        <button onClick={toggleTheme}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: isDarkMode ? 'white' : 'black',
                backgroundColor: isDarkMode ? '#333' : '#ddd',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s,color 0.3s',
            }}
        >
            {isDarkMode ? 'SWITCH TO DARK MODE' : 'SWITCH TO LIGHT MODE'}
        </button>
    );
};
export default DarkMode;