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

  const randomDuplicate = baseClasses[Math.floor(Math.random() * baseClasses.length)];
  const tiles = [...baseClasses, randomDuplicate];

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

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

  if (selectedTiles.includes(clickedImg)) {
    return;
  }

  clickedImg.classList.add("selected");
  selectedTiles.push(clickedImg);

  if (selectedTiles.length >= 1) {
    resetBtn.style.display = "inline-block";
  }

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
