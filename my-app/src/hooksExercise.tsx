import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext, themes } from './ThemeContext';

export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark: themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}> Toggle Theme </button>
            <ClickCounter/>
        </ThemeContext.Provider>
    )
}


function ClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  const theme = useContext(ThemeContext);
  return (
    <div
        style={{
            background:theme.background,
            color: theme.text,
            padding: "20px",
        }}>
      <p>You clicked {count} times </p>
      <button onClick={handleClick} style={{ background: theme.text, color:theme.background }}>Click me!</button>
    </div>
  );
}
