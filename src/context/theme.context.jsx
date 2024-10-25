import { createContext, useState } from "react";

const ThemeContext = createContext()

function ThemeWrapper(props){

  const [isDark, setIsDark] = useState(true)

  const handleTheme = (e)=>{
    setIsDark(e.target.checked)
  }

  const passedContext = {
    isDark,
    handleTheme
  }

  return (
    <ThemeContext.Provider value={passedContext}>
      {props.children}
    </ThemeContext.Provider>
  )

}

export {
  ThemeContext,
  ThemeWrapper
}