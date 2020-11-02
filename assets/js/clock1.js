// The week days
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// The Clock Ticker
function clockTicker() {
  // Clock units
  var date = new Date();
  var day = date.getDay();
  var hrs = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();

  // Update hours value if greater than 12
  if (hrs > 12) {
    hrs = hrs - 12;

    document.querySelector("#clock .period").innerHTML = "PM";
  } else {
    document.querySelector("#clock .period").innerHTML = "AM";
  }

  // Pad the single digit units by 0
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  // Refresh the unit values
  document.querySelector("#clock .day").innerHTML = weekDays[day];
  document.querySelector("#clock .hours").innerHTML = hrs;
  document.querySelector("#clock .minutes").innerHTML = mins;
  document.querySelector("#clock .seconds").innerHTML = secs;

  // Refresh the clock every 1 second
  requestAnimationFrame(clockTicker);
}

// Start the clock
clockTicker();
