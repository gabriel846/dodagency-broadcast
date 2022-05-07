// Packages
import { useEffect, useState } from "react";

// Pages
import { Loading } from "../pages/Loading/Loading";

// Components
import { Main } from "../components/UI/Main";
import { Routes } from "../routes";
import { Topbar } from "../components/Topbar";

// Themes
import {
  LOADING_CONTAINER_STYLE,
  LOADING_MESSAGE_STYLE,
} from "../environment/theme/Variables";

function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);

  useEffect(() => {
    const appLoadingTimeout = setTimeout(
      () => setAppIsLoading((previousValue) => !previousValue),
      500
    );

    return () => clearTimeout(appLoadingTimeout);
  }, []);

  return (
    <>
      <Topbar />
      <Main centeredMainAxis>
        {appIsLoading ? (
          <Loading
            containerStyle={LOADING_CONTAINER_STYLE}
            message="Loading..."
            textStyle={LOADING_MESSAGE_STYLE}
          />
        ) : (
          <Routes />
        )}
      </Main>
    </>
  );
}

export default App;
