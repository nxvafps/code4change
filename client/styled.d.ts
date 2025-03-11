import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      accent: {
        main: string;
        hover: string;
      };
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
      badges: {
        bronze: string;
        silver: string;
        gold: string;
        platinum: string;
        diamond: string;
      };
      background: {
        default: string;
        paper: string;
        dark: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        light: string;
      };
      border: {
        light: string;
        medium: string;
        dark: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      xl: string;
      circle: string;
    };
    typography: {
      fontFamily: {
        sans: string;
        mono: string;
      };
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        h1: string;
        h2: string;
        h3: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        bold: number;
      };
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
      xl: string;
    };
    transitions: {
      fast: string;
      medium: string;
      slow: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
