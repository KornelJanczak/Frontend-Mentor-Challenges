`use strict`;
const jobsContainer = document.querySelector(".job-list");
const jobList = document.querySelector(".job-list");
const filters = document.querySelector(".active-filter");
const filterList = document.querySelector(".filter-list");
const clearBtn = document.querySelector(".clear-btn");
jobsContainer.innerHTML = "";
let jobsArr;
let filterArr;
let filtr = [];

// Get Json
const getJSON = async function () {
  const response = await fetch("data.json");
  const jobs = await response.json();
  jobsArr = jobs.map((job) => job);
};
getJSON();

// Get tag
const getTagHTML = function (tag) {
  return `<li class="li-tech-item">${tag}</li>`;
};

// Render Jobs
const renderJobs = function (jobsArr) {
  let htmlJob;
  jobsArr.forEach((job) => {
    // Special tag
    let newTag = job.new === true ? `<span class="new-tag">NEW!</span>` : "";
    let featured =
      job.featured === true ? `<span class="featured-tag">FEATURED</span>` : "";
    // Get tag
    const tagArr = [job.role, job.level, ...job.languages, ...job.tools];
    const tagString = tagArr.reduce((acc, curTag) => {
      return acc + getTagHTML(curTag);
    }, "");
    // Render
    htmlJob = `
    <div class="job-box">
    <div class="info-box">
    <img src="${job.logo}" class="job-logo" alt="job-logo" />
    <div class="content">
    <div class="company-name">
    ${job.company}
    ${newTag}
    ${featured}
    </div>
    <div class="work-name">${job.position}</div>
    <ul class="ul-basic-info">
    <li class="posted-at">${job.postedAt}</li>
    <li class="work-time">${job.contract}</li>
    <li class="location">${job.location}</li>
    </ul>
    </div>
    </div>
    
    <ul class="ul-tech-stack">
    ${tagString}
    </ul>
    </div>
    `;
    jobsContainer.insertAdjacentHTML("beforeend", htmlJob);
  });
};

// Filter
const filterJob = function (filtr) {
  filterArr = jobsArr.filter((user) => {
    const tags = [user.level, user.role].concat(user.tools, user.languages);
    return filtr.some((f) => tags.includes(f));
  });
  jobsContainer.innerHTML = "";
  if (filterArr.length === 0) renderJobs(jobsArr), clear();
  else renderJobs(filterArr);
};

// Clear All
const clear = function () {
  filterList.innerHTML = "";
  jobsContainer.innerHTML = "";
  filters.classList.add("hidde");
  filtr = [];
  renderJobs(jobsArr);
};

// Update UI
const updateUI = async function () {
  try {
    await getJSON();
    renderJobs(jobsArr);
  } catch (err) {
    console.error(err.message);
  }
};
updateUI();

// Update filter UI
const updateFilterUI = function (filtrArr) {
  filterList.innerHTML = "";
  filtrArr.forEach((f, i) => {
    const html = `
    <li class='li-tech-item filter-tag' id="${i}"> 
      <span class="filtr-span">${f}</span>
      <button class="delete-btn">
        <img src="images/icon-remove.svg" 
        alt="remove-icon"/>
      </button>
    </li>`;
    filterList.insertAdjacentHTML("beforeend", html);
  });
};

// EventListener
jobList.addEventListener("click", function (e) {
  // Filter
  if (!e.target.classList.contains("li-tech-item")) return;
  filters.classList.remove("hidde");
  filtr.push(e.target.textContent);
  const noDuplicate = new Set(filtr);
  filtr = Array.from(noDuplicate);
  filterJob(filtr);
  updateFilterUI(filtr);
});

// Delete filter tag
filters.addEventListener("click", (e) => {
  if (!e.target.closest(".delete-btn")) return;
  const curID = +e.target.closest(".filter-tag").id;
  filtr = filtr.filter((t, i) => i !== curID);
  filterJob(filtr);
  updateFilterUI(filtr);
});

clearBtn.addEventListener("click", clear);
