"use client"

import React, { createContext, useState, useContext, useEffect } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";

type ThemeProps = {
    children: React.ReactNode;
};

type ThemeContextProps = {
    isDarkTheme: boolean;
    setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
    toggleTheme: () => void;
    theme: Theme;
};

export const ThemeContext = createContext<ThemeContextProps>({
    isDarkTheme: true,
    setIsDarkTheme: () => { },
    toggleTheme: () => { },
    theme: createTheme(),
});

const ThemeProviderComponent: React.FC<ThemeProps> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("isDarkTheme");
        if (storedTheme !== null) {
            setIsDarkTheme(storedTheme === "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("isDarkTheme", String(isDarkTheme));
    }, [isDarkTheme]);

    const theme = createTheme({
        palette: {
            mode: isDarkTheme ? "dark" : "light",
            primary: {
                main: '#902bf5',
            },
            secondary: {
                main: '#FFFFFF',
            },
            background: {
                default: isDarkTheme ? '#202124' : '#f5f5f5',
                paper: isDarkTheme ? '#202124' : '#fff',
            },
            text: {
                primary: isDarkTheme ? '#D9DBDE' : '#000',
                secondary: isDarkTheme ? '#bdbdbd' : '#616161',
            },
        },
    });

    const contextValue: ThemeContextProps = {
        isDarkTheme,
        setIsDarkTheme,
        toggleTheme,
        theme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProviderComponent;
