import React, { Suspense, lazy } from 'react';
import ReactDOM from "react-dom";
import { useNetworkStatus } from 'react-adaptive-hooks/network';
import { useHardwareConcurrency } from 'react-adaptive-hooks/hardware-concurrency';
import { useMemoryStatus } from 'react-adaptive-hooks/memory';

const Full = lazy(() => import('./full.js'));
const Light = lazy(() => import('./light.js'));

const Media = () => {
  const { effectiveConnectionType } = useNetworkStatus();
  const { numberOfLogicalProcessors } = useHardwareConcurrency();
  const { deviceMemory } = useMemoryStatus();
  return (
    <>
      <h3>{'your connection is ' + effectiveConnectionType}</h3>
      <h3>{'your cpu cores ' + numberOfLogicalProcessors}</h3>
      <h3>{'your memory ' + deviceMemory}</h3>
    </>
  )
}

const App = () => {
  const { effectiveConnectionType } = useNetworkStatus();
  return (
    <div className="App">
      <header className="App-header">
        <Suspense fallback={<div>Loading...</div>}>
          <Media />
          { effectiveConnectionType === '4g' ? <Full /> : <Light /> }
        </Suspense>
      </header>
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
