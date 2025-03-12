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
      main: "#1c1c1c",
      light: "#2d2d2d",
      dark: "#121212",
      contrastText: "#ffffff",
    },
    accent: {
      main: "#3b82f6",
      hover: "#2563eb",
    },
    status: {
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
      info: "#17a2b8",
    },
    badges: {
      bronze: "#cd7f32",
      silver: "#c0c0c0",
      gold: "#ffd700",
      platinum: "#e5e4e2",
      diamond: "#b9f2ff",
    },
    background: {
      default: "#121212",
      paper: "#1c1c1c",
      dark: "#000000",
    },
    text: {
      primary: "#e5e5e5",
      secondary: "#a3a3a3",
      disabled: "#555555",
      light: "#ffffff",
    },
    border: {
      light: "#4b5563",
      medium: "#6b7280",
      dark: "#333333",
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
      xs: "0.85rem",
      sm: "0.95rem",
      md: "1.1rem",
      lg: "1.35rem",
      xl: "1.6rem",
      xxl: "2rem",
      h1: "2.5rem",
      h2: "2rem",
      h3: "1.75rem",
    },
    fontWeight: {
      normal: 400,
      medium: 600,
      bold: 800,
    },
  },
  shadows: {
    small: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    medium: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    large: "0px 10px 20px rgba(0, 0, 0, 0.4)",
    xl: "0px 20px 40px rgba(0, 0, 0, 0.5)",
  },
  transitions: {
    fast: "0.15s ease-in-out",
    medium: "0.3s ease-in-out",
    slow: "0.6s ease-in-out",
  },
  breakpoints: {
    xs: "360px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1440px",
  },
};

export default theme;
