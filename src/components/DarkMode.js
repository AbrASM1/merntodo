import React from "react";
import { useState } from "react";
import { Lightbulb, LightbulbOff } from 'lucide-react';

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);

        document.body.classList.toggle('dark-theme');
    };
    return (
        <button onClick={toggleTheme}
            style={{
                marginbottom: "10px",
                fontWeight: 'bold',
                color: isDarkMode ? 'white' : 'black',
                backgroundColor: "transparent",
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s,color 0.3s',
                height:'70%',
            }}
        >
            {isDarkMode ? <Lightbulb /> : <LightbulbOff />}
        </button>
    );
};
export default DarkMode;