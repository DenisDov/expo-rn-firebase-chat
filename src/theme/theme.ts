import { createTheme } from "@shopify/restyle";
import tinycolor from "tinycolor2";

const palette = {
  black: "#0B0B0B",
  white: "#F0F2F3",
  blue: "#2f95dc",
  // gray: "#808080",
  red: "#D9534F",
  shadow: "#00000020",
};

const theme = createTheme({
  colors: {
    primary: palette.blue,
    background: palette.white,
    text: palette.black,

    btnText: palette.white,
    primaryActive: tinycolor(palette.blue).darken(10).toString(),
    shadow: palette.shadow,
    error: palette.red,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontFamily: "GeistSans",
      fontSize: 16,
      color: "text",
    },
    title: {
      fontFamily: "GeistMono",
      fontSize: 24,
    },
  },
});

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    text: palette.white,
  },
};

export type Theme = typeof theme;

export { theme, darkTheme };
