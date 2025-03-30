import { fetchBird } from "./js/api.js";
import {createPageDropDown,loadbirdList,onChangePage} from './js/ui.js';

const selectEl = document.getElementById("page");
const listContainerEl = document.getElementById("list");


async function initialize() {
    const response = await fetchBird()
    console.log(response);
    const birdList = response.entities;
    const totalPage = response.total/response.pageSize;
     createPageDropDown(selectEl,totalPage);
     loadbirdList(listContainerEl,birdList)
     selectEl.addEventListener("change",onChangePage)
}

//

initialize();
