export const getSavedVillagerIds = () => {
  const savedVillagerIds = localStorage.getItem('saved_villagers')
    ? JSON.parse(localStorage.getItem('saved_villagers'))
    : [];

  return savedVillagerIds;
};

export const saveVillagerIds = (villagerIdArr) => {
  if (villagerIdArr.length) {
    localStorage.setItem('saved_villagers', JSON.stringify(villagerIdArr));
  } else {
    localStorage.removeItem('saved_villagers');
  }
};

export const removeVillagerId = (villagerId) => {
  const savedVillagerIds = localStorage.getItem('saved_villagers')
    ? JSON.parse(localStorage.getItem('saved_villagers'))
    : null;

  if (!savedVillagerIds) {
    return false;
  }

  const updatedSavedVillagerIds = savedVillagerIds?.filter((savedVillagerId) => savedVillagerId !== villagerId);
  localStorage.setItem('saved_villagers', JSON.stringify(updatedSavedVillagerIds));

  return true;
};
