import { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  const value = {
    theme,
    toggleTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export default ThemeProvider;
