export const sortMapByKeyLength = (map: Map<string, unknown>) => {
  const sortedKeys = [...map.keys()].sort((a, b) => b.length - a.length);
  const sortedMap = new Map<string, unknown>();
  sortedKeys.forEach(key => sortedMap.set(key, map.get(key)));
  return sortedMap;
}