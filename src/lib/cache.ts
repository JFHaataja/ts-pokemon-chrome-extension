export async function getCachedData<T>(key: string): Promise<T | null> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] ?? null);
      });
    } else {
      resolve(null);
    }
  });
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [key]: data }, () => resolve());
    } else {
      resolve();
    }
  });
}
