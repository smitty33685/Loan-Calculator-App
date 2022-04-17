const cache: Record<string, any> = {};

export const saveToCache = (id: string, data: any) => {
  cache[id] = data;
};

export const readFromCache = (id: string) => {
  return cache[id];
};
