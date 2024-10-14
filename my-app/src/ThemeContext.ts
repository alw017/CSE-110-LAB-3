import React from 'react';

export const themes = {
 light: {
   text: '#000000',
   background: '#eeeeee',
 },
 dark: {
   text: '#ffffff',
   background: '#222222',
 },
};

export const ThemeContext = React.createContext(themes.light);