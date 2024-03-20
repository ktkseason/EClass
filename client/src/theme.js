// color design tokens export
export const colorTokens = {
    white: {
        100: "#fcfdfc",
        200: "#f9fbf9",
        300: "#f6faf6",
        400: "#f3f8f3",
        500: "#f0f6f0",
        600: "#c0c5c0",
        700: "#909490",
        800: "#606260",
        900: "#303130"
    },
    black: {
        100: "#d2d3d2",
        200: "#a4a7a4",
        300: "#777a77",
        400: "#494e49",
        500: "#1c221c",
        600: "#161b16",
        700: "#111411",
        800: "#0b0e0b",
        900: "#060706"
    },
    purple: {
        100: "#e9e4ec",
        200: "#d2c9d9",
        300: "#bcafc7",
        400: "#a594b4",
        500: "#8f79a1",
        600: "#726181",
        700: "#564961",
        800: "#393040",
        900: "#1d1820"
    },
    indigo: {
        100: "#e1e7d4",
        200: "#c3d0a9",
        300: "#a4b87e",
        400: "#86a153",
        500: "#688928",
        600: "#536e20",
        700: "#3e5218",
        800: "#2a3710",
        900: "#151b08"
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark" ? {
                // palette values for dark mode
                primary: {
                    dark: colorTokens.purple[800],
                    main: colorTokens.purple[500],
                    light: colorTokens.purple[200]
                },
                secondary: {
                    dark: colorTokens.indigo[800],
                    main: colorTokens.indigo[500],
                    light: colorTokens.indigo[200]
                },
                background: {
                    default: colorTokens.black[500],
                    alt: colorTokens.black[600],
                },
                text: {
                    default: colorTokens.white[400],
                    alt: colorTokens.white[500],
                    btn: colorTokens.white[300]
                }
            } : {
                // palette values for light mode
                primary: {
                    dark: colorTokens.purple[200],
                    main: colorTokens.purple[500],
                    light: colorTokens.purple[800]
                },
                secondary: {
                    dark: colorTokens.indigo[200],
                    main: colorTokens.indigo[500],
                    light: colorTokens.indigo[800]
                },
                background: {
                    default: colorTokens.white[500],
                    alt: colorTokens.white[400],
                },
                text: {
                    default: colorTokens.black[400],
                    alt: colorTokens.black[500],
                    btn: colorTokens.white[300]
                }
            }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Poppins", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};