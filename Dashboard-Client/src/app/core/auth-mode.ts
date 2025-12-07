export const isDevAuth = () => {
  const host = window.location.hostname;

  // Automatically treat all local hosts as development
  return host === 'localhost' || host === '127.0.0.1';
};
