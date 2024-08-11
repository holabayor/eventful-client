'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = () => {
  return (
    <ProgressBar
      style="style"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBarProvider;
