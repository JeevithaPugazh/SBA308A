import { setAttribute } from "./utils.js";
import { fetchBirdByID, fetchBird } from "./api.js";
const birdDetailContainer = document.getElementById(
  "birdDetailContainer"
);
const birdDetailEl = document.getElementById("birdDetail");
const birdsEl = document.getElementById("birds");
const selectEl = document.getElementById("page");
const listContainerEl = document.getElementById("list");

function createDivElement(content) {
  const div = document.createElement("div");
  div.innerHTML = content;
  return div;
}

export function createPageDropDown(
  selectElement,
  pageCount
) {
  for (let i = 1; i <= pageCount; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.textContent = i;
    selectElement.appendChild(option);
  }
}

export function loadbirdList(listEl, birdList) {
  listEl.innerHTML = "";
  for (let i = 0; i < birdList.length; i++) {
    const imgDiv = createDivElement("");
    imgDiv.setAttribute(
      "class",
      "w-50 h-50 mb-10 p-5 bg-cover  flex flex-col justify-between  rounded-md"
    );
    const image = document.createElement("img");
    const birdName = createDivElement("");
    const noImg = "././images/noImage.png";
    setAttribute(image, {
      src:
        birdList[i].images.length > 0
          ? birdList[i].images[0]
          : noImg,
      class: "w-full h-full rounded-md  ",
    });
   
   // birdName.innerHTML = `${birdList[i].name}`;
    image.addEventListener("click", birdDetailsView);
    image.setAttribute("id", birdList[i].id);
    imgDiv.appendChild(image);

    imgDiv.appendChild(birdName);
    imgDiv.appendChild(image);
    listEl.appendChild(imgDiv);
  }
}

export function backToTheList() {
  birdsEl.style.display = "flex";
  birdDetailContainer.style.display = "none";
}

async function birdDetailsView(event) {
  console.log(event);
  const birdInfo = await fetchBirdByID(event.target.id);
  birdsEl.style.display = "none";
  birdDetailEl.innerHTML = "";
  birdDetailContainer.style.display = "flex";
  birdDetailEl.setAttribute(
    "class",
    "w-5/6 h-screen  m-auto pt-40 px-10 pb-5"
  );
  const image = document.createElement("img");
  setAttribute(image, {
    src: birdInfo.images[0],
    class: "w-100 h-100 m-auto rounded-md",
  });
  birdDetailEl.appendChild(image);
  const birdDetailDiv = createDivElement("bird-detail");
  createLabelValue("Name", birdInfo.name, birdDetailDiv);
  createLabelValue(
    "Family",
    birdInfo.family,
    birdDetailDiv
  );
  createLabelValue(
    "Science Name",
    birdInfo.sciName,
    birdDetailDiv
  );
  createLabelValue(
    "Status",
    birdInfo.status,
    birdDetailDiv
  );
  createLabelValue(
    "Region",
    birdInfo.region.join(", "),
    birdDetailDiv
  );

  birdDetailEl.appendChild(birdDetailDiv);
  const recordingEl = createRecordingList(
    birdInfo.recordings
  );
  birdDetailEl.appendChild(recordingEl);
  console.log(birdInfo);
}

function createTableRow(cols) {
  const tr = document.createElement("tr");
  for (let i = 0; i < cols.length; i++) {
    const td = document.createElement("td");
    td.innerHTML = cols[i];
    tr.appendChild(td);
  }
  return tr;
}
function createRecordingList(recordings) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  thead.append(
    createTableRow([
      "Date",
      "Location",
      "Country",
      "Recorded by",
      "Remark",
      "Download",
    ])
  );
  let tbody = document.createElement("tbody");
  for (let i = 0; i < recordings.length; i++) {
    const trEl = createTableRow([
      recordings[i].date,
      recordings[i].loc,
      recordings[i].cnt,
      recordings[i].rec,
      recordings[i].rmk,
      `<button id="play_button_id" class="px-4 py-2 bg-blue-500 text-white rounded-md">Play</button>`,
    ]);
    trEl
      .querySelector("button")
      .addEventListener("click", function () {
        playBirdSound(recordings[i].file);
      });
    tbody.appendChild(trEl);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}
function playBirdSound(url) {
  const audio = new Audio(url);
  audio.play();
}

function createLabelValue(label, value, parent) {
  const labelEl = createDivElement(label);
  const valueEl = createDivElement(`<h1>${value}</h1>`);
  parent.appendChild(labelEl);
  parent.appendChild(valueEl);
}
export async function onChangePage(e) {
  console.log(e);
  const response = await fetchBird(e.target.value);
  console.log(response);
  const birdList = response.entities;
  const totalPage = response.total / response.pageSize;
  createPageDropDown(selectEl, totalPage);
  loadbirdList(listContainerEl, birdList);
}
