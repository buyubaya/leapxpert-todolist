import React from 'react';
import { useTodoAppContext } from '../TodoAppContainer/context/TodoAppConText';


function ThemeVars() {

  const {
    theme,
  } = useTodoAppContext();
 
  return (
    <style>
      {`
        :root {
          --primary-bg: ${theme === "dark" ? "#1C1D1F" : "#fff"};
          --primary-cl: ${theme === "dark" ? "#ddd" : "#1a1a1a"};
          --disabled-cl: ${theme === "dark" ? "#666666" : "#b3b3b3"};

          --todo-list-bg: ${theme === "dark" ? "#262626" : "#fff"};
          --primary-border: ${theme === "dark" ? "#5d5d5d" : "#ccc"};
        }
      `}
    </style>
  );
}


export default ThemeVars;
