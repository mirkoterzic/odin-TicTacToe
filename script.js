const form = document.querySelector("#myForm");

form.addEventListener("submit", (event) => {
  //prevent page from refresh
  event.preventDefault();

  //initilize form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  document.querySelector(".modal-wrapper").setAttribute("hidden", true);
  console.log(data);
});
