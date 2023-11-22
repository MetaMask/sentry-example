import * as Sentry from '@sentry/browser';

function App() {
  return (
    <div className="App">
      <button onClick={() => global.sentry.startSession()}>Start session</button>
      <button onClick={() => global.sentry.endSession()}>End session</button>

      <br />

      <button onClick={() => global.sentry.captureException(
        `Random exception: ${Math.random()}`
      )}>
        global.sentry.captureException()
      </button>
      <button onClick={()=> Sentry.captureException(
        `Random exception: ${Math.random()}`
      )}>
        Sentry.captureException()
      </button>
    </div>
  );
}

export default App;
