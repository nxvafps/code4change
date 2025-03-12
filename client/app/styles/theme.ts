import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: {
      main: "#28a745",
      light: "#48c76a",
      dark: "#1e7e34",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#24292e",
      light: "#3a3f45",
      dark: "#1b1f23",
      contrastText: "#ffffff",
    },
    accent: {
      main: "#0070f3",
      hover: "#005bb5",
    },

    status: {
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
      info: "#17a2b8",
    },
    badges: {
      bronze: "#cd7f32",
      silver: "silver",
      gold: "gold",
      platinum: "#e5e4e2",
      diamond: "#b9f2ff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
      dark: "#0a0a0a",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
      disabled: "#9ca3af",
      light: "#ffffff",
    },
    border: {
      light: "#e5e7eb",
      medium: "#d1d5db",
      dark: "#6b7280",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  borderRadius: {
    small: "0.375rem",
    medium: "0.5rem",
    large: "0.75rem",
    xl: "1rem",
    circle: "50%",
  },
  typography: {
    fontFamily: {
      sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      mono: "Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.85rem",
      md: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      xxl: "1.8rem",
      h1: "2rem",
      h2: "1.8rem",
      h3: "1.5rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  shadows: {
    small: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    large: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  },
  transitions: {
    fast: "0.2s ease",
    medium: "0.3s ease",
    slow: "0.5s ease",
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

export default theme;
