//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

const baseClasses = ["img1", "img2", "img3", "img4", "img5"];
let selectedTiles = [];

function init() {
  imageContainer.innerHTML = "";
  para.textContent = "";
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Pick one random image class to duplicate
  const randomDuplicate = baseClasses[Math.floor(Math.random() * baseClasses.length)];
  const tiles = [...baseClasses, randomDuplicate];

  // Shuffle array using Fisher-Yates algorithm
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  // Render 6 images
  tiles.forEach((cls) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.setAttribute("data-ns-test", cls);
    img.addEventListener("click", handleTileClick);
    imageContainer.appendChild(img);
  });
}

function handleTileClick(e) {
  const clickedImg = e.target;

  // Prevent selecting the same image element twice
  if (selectedTiles.includes(clickedImg)) {
    return;
  }

  clickedImg.classList.add("selected");
  selectedTiles.push(clickedImg);

  // State 2: At least one tile clicked -> show Reset
  if (selectedTiles.length >= 1) {
    resetBtn.style.display = "inline-block";
  }

  // State 3: Exactly two tiles clicked -> show Verify; >2 -> hide Verify
  if (selectedTiles.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else {
    verifyBtn.style.display = "none";
  }
}

resetBtn.addEventListener("click", () => {
  selectedTiles.forEach((img) => img.classList.remove("selected"));
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  para.textContent = "";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selectedTiles.length === 2) {
    const firstClass = selectedTiles[0].getAttribute("data-ns-test");
    const secondClass = selectedTiles[1].getAttribute("data-ns-test");

    if (firstClass === secondClass) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
});

init();
