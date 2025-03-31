import { setAttribute } from "./utils.js";
import { fetchBirdByID, fetchBird } from "./api.js";
const birdDetailContainer = document.getElementById(
  "birdDetailContainer"
);
const birdDetailEl = document.getElementById("birdDetail");
const birdsEl = document.getElementById("birds");
const selectEl = document.getElementById("page");
const listContainerEl = document.getElementById("list");
const audioContent = document.getElementById("myAudio");

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
  for (let i = 0; i < birdList.length; i++) {
    const imgDiv = createDivElement("");
    imgDiv.setAttribute(
      "class",
      "w-250 h-120 mb-10 ml-auto p-5 bg-cover  flex flex-row justify-between  rounded-md"
    );
    const image = document.createElement("img");
    const birdName = createDivElement(
      `<div style = "font-family: 'Delius Swash Caps', cursive;font-size: 24px;" class="mb-2">${birdList[i].name}</div><div class="text-xl"><ul class="list-disc pl-10"><li>${birdList[i].sciName}</li><li>${birdList[i].region[0]}</li></ul></div>`
    );
    const noImg = "././images/noImage.png";
    setAttribute(image, {
      src:
        birdList[i].images.length > 0
          ? birdList[i].images[0]
          : noImg,
      class: "w-100 h-full rounded-md  ",
    });

    birdName.setAttribute("class", "m-10");
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
  birdDetailEl.innerHTML = ``;
}

async function birdDetailsView(event) {
  console.log(event);
  const birdInfo = await fetchBirdByID(event.target.id);
  const imageAndInfoContainer =
    document.createElement("div");
  imageAndInfoContainer.setAttribute(
    "class",
    "flex flex-row justify-center mb-5"
  );
  birdsEl.style.display = "none";
  birdDetailContainer.style.display = "flex";
  birdDetailEl.setAttribute(
    "class",
    "overflow-hidden w-full h-200  px-10 pb-5 flex flex-col justify-center"
  );
  birdDetailEl.appendChild(imageAndInfoContainer);
  const imageContainer = document.createElement("div");
  setAttribute(imageContainer, {
    class: "inline-block",
  });
  const image = document.createElement("img");
  setAttribute(image, {
    src: birdInfo.images[0],
    class: "w-100 h-100 mt-30 rounded-md",
  });
  imageContainer.appendChild(image);
  imageAndInfoContainer.appendChild(imageContainer);
  const birdDetailDiv = document.createElement("div");
  setAttribute(birdDetailDiv, {
    class: "inline-block mt-30 p-5",
  });
  createLabelValue("Name:", birdInfo.name, birdDetailDiv);
  createLabelValue(
    "Family:",
    birdInfo.family,
    birdDetailDiv
  );
  createLabelValue(
    "Science Name:",
    birdInfo.sciName,
    birdDetailDiv
  );
  createLabelValue(
    "Status:",
    birdInfo.status,
    birdDetailDiv
  );
  createLabelValue(
    "Region:",
    birdInfo.region.join(", "),
    birdDetailDiv
  );

  imageAndInfoContainer.appendChild(birdDetailDiv);
  const recordingEl = createRecordingList(
    birdInfo.recordings
  );
  const recordsListDiv = document.createElement("div");
  recordsListDiv.appendChild(recordingEl);
  setAttribute(recordsListDiv, {
    class: "table-wrp block max-h-96 w-full",
  });
  birdDetailEl.appendChild(recordsListDiv);
  console.log(birdInfo);
}

function createTableRow(cols, isThead) {
  const tr = document.createElement("tr");
  for (let i = 0; i < cols.length; i++) {
    const td = document.createElement("td");
    td.innerHTML = cols[i];
    setAttribute(td, {
      class: isThead
        ? "text-md px-4 py-2 font-medium text-gray-900 "
        : " text-sm px-4 py-2 font-light text-gray-900",
    });
    tr.appendChild(td);
  }
  return tr;
}
function createRecordingList(recordings) {
  let table = document.createElement("table");
  setAttribute(table, {
    class: "overflow-hidden h-full",
  });
  let thead = document.createElement("thead");
  thead.append(
    createTableRow(
      [
        "Date",
        "Location",
        "Country",
        "Recorded by",
        "Remark",
        "Sound",
      ],
      true
    )
  );
  let tbody = document.createElement("tbody");
  setAttribute(thead, {
    class:
      "ext-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky",
  });
  setAttribute(tbody, {
    class: "h-96 overflow-y-auto",
  });
  for (let i = 0; i < recordings.length; i++) {
    const trEl = createTableRow([
      recordings[i].date,
      recordings[i].loc,
      recordings[i].cnt,
      recordings[i].rec,
      recordings[i].rmk,
      `<div class='flex flex-row'><button name="play" id="play_button_id" class="mr-1 px-4 py-2 bg-blue-500 text-white rounded-md"><span class="hidden text-green-500 font-bold mr-5" id="playing-icon-${i}">🎵</span>Play</button>
      
      <button name="stop" id="play_button_id" class="px-4 py-2 bg-blue-500 text-white rounded-md">Stop</button></div>`,
    ]);

    const playButton = trEl.querySelector(
      "button[name='play']"
    );
    const stopButton = trEl.querySelector(
      "button[name='stop']"
    );
    const playingIcon = trEl.querySelector(
      `#playing-icon-${i}`
    );

    playButton.addEventListener("click", function () {
      playBirdSound(recordings[i].file);
      playingIcon.classList.remove("hidden"); // Show the icon
    });

    stopButton.addEventListener("click", function () {
      audioContent.pause();
      playingIcon.classList.add("hidden"); // Hide the icon
    });

    // trEl
    //   .querySelector("button[name='play']")
    //   .addEventListener("click", function (e) {
    //     playBirdSound(recordings[i].file);
    //   });
    // trEl
    //   .querySelector("button[name='stop']")
    //   .addEventListener("click", function (e) {
    //     audioContent.pause();
    //   });
    tbody.appendChild(trEl);
  }
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}
function playBirdSound(url) {
  audioContent.src = url;
  audioContent.play();
}

function createLabelValue(label, value, parent) {
  const pair = document.createElement("div");
  const labelEl = document.createElement("div");
  const valueEl = document.createElement("div");
  pair.appendChild(labelEl);
  pair.appendChild(valueEl);
  setAttribute(labelEl, {
    class: "text-lg  font-semibold inline-block",
  });
  labelEl.innerHTML = label;
  valueEl.innerHTML = value;
  setAttribute(valueEl, {
    class: "text-lg pl-5  inline-block",
  });

  parent.appendChild(pair);
}
export async function onChangePage(e) {
  console.log(e);
  const response = await fetchBird(e.target.value);
  console.log(response);
  const birdList = response.entities;
  listContainerEl.innerHTML = "";
  listContainerEl.scrollTo(0,0);
  loadbirdList(listContainerEl, birdList);
}
