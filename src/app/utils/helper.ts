export const close_modal = (id) => {
  const save = document.getElementById(id);
  save.classList.add("hidden");
};

export const showModal = (id) => {
  const save = document.getElementById(id);
  save.classList.remove("hidden");
};
