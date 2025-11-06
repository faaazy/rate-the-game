export function initLocalStorage() {
  let cardsData = [];

  function saveToLocalStorage(cardsData) {
    localStorage.setItem("cardsData", JSON.stringify(cardsData));

    const jsonString = JSON.stringify(cardsData);
    const blob = new Blob([jsonString], { type: "application/json" });

    const jsonLink = document.querySelector("[data-json-file]");
    if (jsonLink) {
      jsonLink.href = URL.createObjectURL(blob);
      jsonLink.download = "data.json";
    }
  }

  // reading from localStorage
  if (localStorage.getItem("cardsData")) {
    cardsData = JSON.parse(localStorage.getItem("cardsData"));
  }

  // fileInput
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          try {
            const data = JSON.parse(e.target.result);
            cardsData = data;
            saveToLocalStorage(cardsData);
            document.dispatchEvent(
              new CustomEvent("localStorageUpdated", {
                detail: { cardsData },
              })
            );
          } catch (err) {
            console.error("Error reading file:", err);
          }
        };

        reader.readAsText(file);
      }
    });
  }

  return { cardsData, saveToLocalStorage };
}
