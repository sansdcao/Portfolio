// Function to update the time

function updateTime(){
    const timeElement = document.getElementById("time");// fill in

    // Get the current time
    const now = new Date();
    let hours = now.getHours();// fill in
    let minutes = now.getMinutes();//fill in
    let seconds = now.getSeconds();//fill in
    let milliseconds = now.getMilliseconds();

    //format minutes, and seconds to be two digits and 12h clock
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours === 12 ? 1 : hours % 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;

    //display the time in HH:MM:SS format

    timeElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds} ${ampm}`

}

function currentDate(){
    const dateElement = document.getElementById("date");//fill in

    //get current date
    const now = new Date();
    let month = now.getMonth() + 1; // months are 0-based, ergo you needa add one
    let day = now.getDate();
    let year = now.getFullYear();

    // format the date
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // display the date
    dateElement.textContent = `${month}/${day}/${year}`
}

//formats speedrun time

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2);
  return `${mins}:${secs}`;
}

//pulls leaderboard from speedrun.com
async function loadLeaderboard() {
 const response = await fetch("https://www.speedrun.com/api/v1/leaderboards/369p3p81/category/02qve6pd?var-68k8q2l8=5q8z4pql&top=10&embed=players");
  const data = await response.json();

  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = "";

  data.data.runs.forEach(async (entry, index) => {
  const playerRef = entry.run.players[0];

  let player = "Unknown";

  if (playerRef?.id) {
    try {
      const res = await fetch(
        `https://www.speedrun.com/api/v1/users/${playerRef.id}`
      );
      const userData = await res.json();

      player = userData.data.names.international;
    } catch (e) {
      console.log("Player fetch failed:", e);
    }
  }

  const time = entry.run.times.primary_t;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${player}</td>
    <td>${formatTime(time)}</td>
  `;

  tbody.appendChild(row);
});
}




//Call the update time function every second
setInterval(updateTime, 1)
setInterval(loadLeaderboard, 30000);

//Initialization
updateTime();
currentDate();
loadLeaderboard();

