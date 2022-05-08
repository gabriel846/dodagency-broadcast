// Packages
import React from "react";

// Components
import { Main } from "../components/UI/Main";
import { Routes } from "../routes";
import { Topbar } from "../components/Topbar";

export function App() {
  return (
    <>
      <Topbar />
      <Main centeredMainAxis vertical>
        <Routes />
      </Main>
    </>
  );
}
