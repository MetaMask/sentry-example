import * as Sentry from '@sentry/browser';

export function setupSentry() {
  const { REACT_APP_SENTRY_PUBLIC_KEY, REACT_APP_SENTRY_PROJECT_ID } = process.env;

  Sentry.init({
    dsn: `https://${REACT_APP_SENTRY_PUBLIC_KEY}@sentry.io/${REACT_APP_SENTRY_PROJECT_ID}`,
    debug: true,
    autoSessionTracking: false,
    release: 'sentry-example',
  });

  function captureException(exceptionMessage) {
    Sentry.captureException(exceptionMessage);
  }

  function startSession() {
    console.log('inside start session fn');
    
    const isHubDefined = !!Sentry.getCurrentHub();
    const isSessionStarted = global.sentry.isSessionStarted
    if (isHubDefined && !isSessionStarted) {
      Sentry.getCurrentHub().startSession();
      Sentry.getCurrentHub().captureSession();

      global.sentry.isSessionStarted = true;
      console.log('session started');
    }
  };

  function endSession() {
    console.log('inside end session fn');

    const isHubDefined = !!Sentry.getCurrentHub();
    const isSessionStarted = global.sentry.isSessionStarted
    if (isHubDefined && isSessionStarted) {
      const endSession = true;
      Sentry.getCurrentHub().captureSession(endSession);
      Sentry.getCurrentHub().endSession();

      global.sentry.isSessionStarted = false;
      console.log('session ended');
    }
  };

  return {
    ...Sentry,
    captureException,
    startSession,
    endSession,
  };
}