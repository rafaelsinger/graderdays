import React, {useEffect} from 'react'
import ThemeSwitch from './ThemeSwitch'

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
            <h1>Settings:</h1>
                <div className='setting'>
                    <h2 className='setting-label'>Switch to {theme === 'light' ? 'dark' : 'light'} mode:</h2>
                    <ThemeSwitch switchTheme={switchTheme} />
                </div>
                {/* <div className='setting'>
                    <h2 className='setting-label'>-setting</h2>
                </div> */}
        </div>
    </div>
  )
}
