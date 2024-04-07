import '../styles/themeSwitch.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../state/selectedTheme/selectedThemeSlice';
import { useEffect } from 'react';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  let isDarkMode = useSelector((state) => state.selectedTheme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  }

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--main-color', isDarkMode ? '#393e46' : '#FFFBF5');
    root.style.setProperty('--secondary-color', isDarkMode ? '#222831' : '#F7EFE5');
    root.style.setProperty('--main-accent-color', isDarkMode ? '#eee' : '#000');
    root.style.setProperty('--secondary-accent-color', isDarkMode ? '#FD7014' : '#7743DB');
  }, [isDarkMode]);

  return (
    <div className='themeSwitchContainer'>
      <label className="themeSwitch">
        <input type="checkbox" defaultChecked={isDarkMode} onClick={handleToggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default ThemeSwitch;