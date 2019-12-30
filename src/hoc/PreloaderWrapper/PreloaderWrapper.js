import React, {Fragment} from 'react';
import {Preloader} from "../../components";

function PreloaderWrapper(
  {
      children,
      isLoading,
      isError,
      isEmpty,
      emptyText,
      fetch,
  }) {
    const showPreloader = isLoading && !isError;
    const allDataIsReady = !isLoading && !isError;
    const showEmptyText = allDataIsReady && isEmpty && emptyText;

    return (
      <Fragment>
          {showPreloader && <Preloader/>}
         {/* {isError && <TryAgain fetch={fetch}/>}
          {showEmptyText && <Empty>{emptyText}</Empty>}*/}
          {allDataIsReady && children}
      </Fragment>
    );
}

export default PreloaderWrapper;