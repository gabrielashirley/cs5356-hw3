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

// Extra credit: Mouse event interactivity
const apiContent = document.getElementById("api-content");
apiContent.addEventListener("mousemove", (e) => {
  const rect = apiContent.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  apiContent.style.setProperty("--mouse-x", `${x}px`);
  apiContent.style.setProperty("--mouse-y", `${y}px`);
});
