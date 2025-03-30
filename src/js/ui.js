import { setAttribute } from "./utils.js";
import { fetchBirdByID,fetchBird } from "./api.js";
const birdDetailEl = document.getElementById("birdDetail");
const birdsEl = document.getElementById("birds");
const selectEl = document.getElementById("page");
const listContainerEl = document.getElementById("list");
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
    listEl.innerHTML = '';
  for (let i = 0; i < birdList.length; i++) {
    const imgDiv = document.createElement("div");
    imgDiv.setAttribute(
      "class",
      "w-100 h-100 mb-10 bg-[url(./images/birdNoImg.jpg)] bg-cover  flex flex-col justify-between  rounded-md"
    );
    const image = document.createElement("img");
    const birdName = document.createElement("div");
    const noImg = "././images/noImage.png";
    setAttribute(image, {
      src:
        birdList[i].images.length > 0
          ? birdList[i].images[0]
          : noImg,
      class:
        birdList[i].images.length > 0
          ? "w-full h-full rounded-t-md "
          : "w-20 h-20 rounded-t-md  ",
    });
    setAttribute(birdName, {
      class:
        "w-full h-20 bg-[#ccd5ae] botton-0 rounded-b-md",
    });
    birdName.innerHTML = `<h2>${birdList[i].name}</h2>`;
    image.addEventListener("click", birdDetailsView);
    image.setAttribute("id", birdList[i].id);
    imgDiv.appendChild(image);

    imgDiv.appendChild(birdName);
    imgDiv.appendChild(image);
    listEl.appendChild(imgDiv);
  }
}

async function birdDetailsView(event) {
  console.log(event);
  const birdInfo = await fetchBirdByID(event.target.id);
  birdsEl.classList.add("hidden");
  birdDetailEl.display = "flex";
  birdDetailEl.setAttribute(
    "class",
    "w-5/6 h-screen bg-blue-500 m-auto pt-20 px-10 pb-5"
  );

  clearDetailView()

  console.log(birdInfo);
}


function clearDetailView(){
    element.innerHTML = '';
}
export async function onChangePage(e) {
    console.log(e)
    const response = await fetchBird(e.target.value)
        console.log(response);
        const birdList = response.entities;
        const totalPage = response.total/response.pageSize;
         createPageDropDown(selectEl,totalPage);
         loadbirdList(listContainerEl,birdList)
}
