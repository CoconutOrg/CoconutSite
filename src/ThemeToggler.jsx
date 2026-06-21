import { useTheme } from '../main'; // Adjust path to where your main.jsx is located

export default function ThemeToggler() {
    const { theme, toggleTheme, setTheme } = useTheme();

    return (
        <button onClick={toggleTheme} style={btnStyle}>
            Current Theme: {theme}. Click to switch!
        </button>
    );
}
