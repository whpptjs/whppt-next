export const replaceInList = function <T extends object>(items: T[], item: T, id: keyof T = '_id' as keyof T): T[] {
  console.log('🚀 ~ file: index.tsx ~ line 23 ~ item', item);
  console.log('🚀 ~ file: index.tsx ~ line 23 ~ items', items);
  if (!Object.keys(item).find(k => k === id)) throw new Error(`New item missing property ${id}`);

  const oldItem = items.find(i => i[id] === item[id]);
  if (!oldItem) throw new Error(`Original item with ${id} = ${item[id]} not found`);

  const oldItemIndex = items.indexOf(oldItem);
  const newItems = [...items];
  newItems.splice(oldItemIndex, 1, item);
  return newItems;
};
