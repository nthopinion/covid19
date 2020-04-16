export const normalizeResults = (results) => {
  return results.map(({ title, id }) => ({
    title: title || '',
    id,
  }));
};
