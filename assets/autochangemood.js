const moods = [
  {
    name: "Pink Cloud ☁️",
    gradient: "linear-gradient(135deg, #ff82c1 0%, #ffa4ec 60%, #f0b6ff 100%)",
    emoji: "🎵"
  },
  {
    name: "Chill Blue 🧊",
    gradient: "linear-gradient(135deg, #80c5ff 10%, #86e3ff 80%, #b8b6ff 100%)",
    emoji: "🧊"
  },
  {
    name: "Lofi Brown ☕",
    gradient: "linear-gradient(135deg, #ab7d5a 0%, #e4bfa5 100%)",
    emoji: "☕"
  },
  {
    name: "Energetic Lime ⚡",
    gradient: "linear-gradient(135deg, #5fff82 15%, #1debb1 80%, #fffcb6 100%)",
    emoji: "⚡"
  },
  {
    name: "Sad Violet 😢",
    gradient: "linear-gradient(135deg, #6e63d6 10%, #a893e0 80%, #b6baff 100%)",
    emoji: "😢"
  }
];
let moodIndex = 0;
function setMood(index) {
  const mood = moods[index];
  document.getElementById("spotify-nitro").style.background = mood.gradient;
  document.getElementById("playlist-mood-text").textContent = mood.name;
  document.getElementById("mood-emoji").textContent = mood.emoji;
}
function changeMood() {
  moodIndex = (moodIndex + 1) % moods.length;
  setMood(moodIndex);
}
document.addEventListener("DOMContentLoaded", () => setMood(moodIndex));
