let players = {};
let completedCourses = new Set();

function showSection(sectionId) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

function onYouTubeIframeAPIReady() {
  const courseList = ['sql', 'dsa', 'js', 'python', 'webdev', 'java'];

  courseList.forEach(course => {
    players[course] = new YT.Player(course, {
      events: {
        'onStateChange': (event) => onPlayerStateChange(event, course)
      }
    });
  });
}

function onPlayerStateChange(event, course) {
  if (event.data == YT.PlayerState.ENDED && !completedCourses.has(course)) {
    completedCourses.add(course);
    document.getElementById(`${course}-progress`).style.width = "100%";
    updateProgressTable(course);
  }
}

function updateProgressTable(course) {
  const row = document.getElementById(`${course}-row`);
  if (row) {
    row.querySelector("td:last-child").textContent = "Completed";
  }
}
