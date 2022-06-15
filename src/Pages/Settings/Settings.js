import React, {useEffect} from 'react'

export default function Settings({theme, setTheme}) {

    useEffect(() => {
        document.title = 'Settings | Grader Days'
    }, [])

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }


  return (
    <div className='settings-container'>
        <div className='settings-info'>
            <button onClick={switchTheme}>switch to {theme === 'light' ? 'dark' : 'light'} mode</button> 
            {/* react toggle ^^ */}
        </div>
    </div>
  )
}
