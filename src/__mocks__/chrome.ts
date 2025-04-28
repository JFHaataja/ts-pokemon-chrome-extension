type StorageCallback = (result: Record<string, unknown>) => void;

export const chrome = {
  storage: {
    local: {
      get: (keys: string[] | string, callback: StorageCallback) => {
        const keysArray = Array.isArray(keys) ? keys : [keys];
        const result: Record<string, unknown> = {};
        for (const key of keysArray) {
          result[key] = null;
        }
        callback(result);
      },
      set: (_items: Record<string, unknown>, callback?: () => void) => {
        callback?.();
      },
    },
  },
};
