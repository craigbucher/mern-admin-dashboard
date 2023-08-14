// from: https://www.youtube.com/watch?v=0cPCMIuDk2I
// https://github.com/ed-roh/fullstack-admin/tree/master
// https://discord.gg/2FfPeEk2mX

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

function App() {
  const mode = useSelector((state) => state.global.mode); // initialize state defined in state/index.js
  // 'useMemo' Hook returns a memoized value. Think of memoization as 
  // caching a value so that it does not need to be recalculated; The useMemo 
  // Hook only runs when one of its dependencies update
  // useMemo will only run when 'mode' changes:
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);  // initialize MUI theme
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline component is a collection of HTML element and  */}
          {/* attribute style normalizations that allows kickstarting an */}
          {/* elegant, consistent, and simple baseline to build upon */}
          <CssBaseline />
          <Routes>
            {/* Set parent element for all subsequent routes/elements: */}
            {/* i.e., <Layout> will be displayed on all pages */}
            {/* <Layout> includes <Navbar> and <Sidebar> */}
            {/* *** <Outlet> in <Layout> will display page designated in route *** */}
            <Route element={<Layout />}>
              {/* redirect 'root' page, '/' to <Dashboard> */}
              {/* emulates redirect after user login (no login in this project) */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
              {/* 'Clean-up' route - replaces anything after '/' with '/dashboard' */}
              <Route path="/*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;