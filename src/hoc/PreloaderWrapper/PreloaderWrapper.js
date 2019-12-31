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
//TODO: доделать возможность изменять размер и цвет через пропсы. Не работает этот компонент, проблемы с пропсами в ColumnList.js

    return (
      <Fragment>
          {showPreloader && <Preloader/>}
          {/*{isError && <TryAgain fetch={fetch}/>}*/}
          {/*{showEmptyText && <Empty>{emptyText}</Empty>}*/}
          {showEmptyText && <div className="Empty">{emptyText}</div>}
          {allDataIsReady && children}
      </Fragment>
    );
}

export default PreloaderWrapper;