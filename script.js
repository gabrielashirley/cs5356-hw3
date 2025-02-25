async function fetchLoveAdvice() {
  try {
    const response = await fetch(
      "https://api.adviceslip.com/advice/search/love"
    );
    const data = await response.json();
    const adviceContainer = document.getElementById("advice-container");

    if (data.slips && data.slips.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.slips.length);
      const advice = data.slips[randomIndex].advice;

      adviceContainer.innerHTML = `
          <blockquote>
            <p>${advice}</p>
          </blockquote>
          <button id="new-advice">Get New Advice</button>
        `;

      document
        .getElementById("new-advice")
        .addEventListener("click", fetchLoveAdvice);
    } else {
      adviceContainer.innerHTML =
        "<p>No love advice available at the moment.</p>";
    }
  } catch (error) {
    console.error("Error fetching love advice:", error);
    document.getElementById("advice-container").innerHTML =
      "<p>Failed to fetch love advice. Please try again later.</p>";
  }
}

fetchLoveAdvice();

const adviceContainer = document.getElementById("advice-container");

adviceContainer.addEventListener("mouseenter", () => {
  adviceContainer.style.transform = "scale(1.05)";
  adviceContainer.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
});

adviceContainer.addEventListener("mouseleave", () => {
  adviceContainer.style.transform = "scale(1)";
  adviceContainer.style.boxShadow = "none";
});

adviceContainer.addEventListener("click", () => {
  adviceContainer.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
