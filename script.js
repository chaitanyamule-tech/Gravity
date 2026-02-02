const modal = document.getElementById("registrationModal");
const gameTitle = document.getElementById("gameTitle");
const entryFee = document.getElementById("entryFee");
const teamFields = document.getElementById("teamFields");

function openForm(game, players, fee) {
 gameTitle.innerText = game + " Registration";

  teamFields.innerHTML = "";

  for (let i = 1; i <= players; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Player " + i + " Name";
    input.required = true;
    teamFields.appendChild(input);
  }

  modal.style.display = "flex";
}

function closeForm() {
  modal.style.display = "none";
}

window.onclick = function(e) {
  if (e.target === modal) {
    closeForm();
  }
};

/* COUNTDOWN TIMER */
const eventDate = new Date("2026-02-20T00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) return;

  document.getElementById("days").innerText =
    Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText =
    Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText =
    Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText =
    Math.floor((diff / 1000) % 60);
}, 1000);

async function submitRegistration(game, teamMembers) {
  const leaderContact = document.querySelector("#leaderContact").value;
  const leaderEmail = document.querySelector("#leaderEmail").value;

  const response = await fetch("http://localhost:5000/api/registrations/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      game,
      teamMembers,
      leaderContact,
      leaderEmail
    })
  });

  const data = await response.json();

  if (data.success) {
    alert("🎉 Registration Successful!");
    closeForm();
  } else {
    alert("❌ Something went wrong");
  }
}
