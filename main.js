//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////DATA////////////////////////////////////////////////////////////
class Tarea {
    constructor(idTar, titulo) {
        this.idTar = idTar;
        this.titulo = titulo;
        this.subtareas = [];
    }
};

class Subtarea {
    constructor(idSub, subTitulo, done) {
        //this.idTar = idTar;
        this.idSub = idSub;
        this.subTitulo = subTitulo;
        this.done = false;
    }
};

var data = {
    tareas: []
}


function getIDtarea() {
    let ID;
    if (data.tareas.length > 0) {
        return ID = data.tareas[data.tareas.length - 1].idTar + 1;
    } else {
        return ID = 0;
    }
}

//set the tarea (id and title) into the data obj
function setTarea(IDtarea, titleTarea) {
    let tarea = new Tarea(IDtarea, titleTarea);
    data.tareas.push(tarea);
    return tarea;
}

//generate ID for each subtarea
function getIDsubTarea(IDtareaInput) {
    
    // let allIDs;
    // allIDs = data.tareas.map(current => current.idTar);
    // index = allIDs.indexOf(parseInt(IDtareaInput));
    // console.log(allIDs, index)
    let index = getIndex(IDtareaInput)
    if (data.tareas[index].subtareas.length > 0) {
        return data.tareas[index].subtareas[data.tareas[index].subtareas.length - 1].idSub + 1;
    } else {
        return 0;
    }
}


function setSubTareas(IDtareaInput, IDsubTarea, titleSubTarea) {

    let subTarea = new Subtarea(IDsubTarea, titleSubTarea);
    console.log(subTarea)

    // let allIDs;
    // allIDs = data.tareas.map(current => current.idTar);
    // index = allIDs.indexOf(parseInt(IDtareaInput));
    // console.log(allIDs, index)
    let index = getIndex(IDtareaInput);

    data.tareas[index].subtareas.push(subTarea);
    console.log(data.tareas)
}

function getPercentage(IDtarea) { 
    // let allIDs;
    // allIDs = data.tareas.map(current => current.idTar);
    // index = allIDs.indexOf(parseInt(IDtarea));
    // console.log(allIDs, index)
    let index = getIndex(IDtarea);

    let position = data.tareas[index].subtareas;
    console.log(data.tareas[index].subtareas.length)
    console.log(position)
    if (position.length > 0) {
        let arr = position.filter(subtarea => subtarea.done === true)
        console.log(arr);
        console.log(Math.round((arr.length / position.length) * 100))
        return Math.round((arr.length / position.length) * 100);
    } else {
        return -1;
    }
}

// remove the tarea from the data obj array
function deleteTarea(IDtarea){
    let index;
    // create an arrray of all the IDs of tareas present
    // allIDs = data.tareas.map(current => current.idTar);
    // index = allIDs.indexOf(IDtarea);
    index = getIndex(IDtarea);
    if (index !== -1) {
        data.tareas.splice(index, 1);
    }
}

function getIndex(IDtarea){
    let allIDs;
    allIDs = data.tareas.map(current => current.idTar);
    console.log(allIDs)
    return allIDs.indexOf(parseInt(IDtarea));
}

function updateDone(IDtarea, IDsubTarea){
    data.tareas[IDtarea].subtareas[IDsubTarea].done = true;
}

function matchTarea(pattern){
    let arr = data.tareas
    let arr2 = arr.filter(tarea => {
        let tit = tarea.titulo
        tit.match(pattern)
    })
    console.log(arr2);
}

//////////////////////////////////////////////
document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
    this.MaterialProgress.setProgress(44);
  });

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////INPUT EVENT LISTENER/////////////////////////////////////////////////

document.querySelector('.inputTarea').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        console.log('has pulsado enter y has escrito' + event.target.value);
        let IDtarea, tarea, title;
        title = event.target.value;
        console.log(title)

        //1. get the ID for the tarea
        IDtarea = getIDtarea();
        console.log(IDtarea);

        //2. put the INPUT/title of tarea and IDtarea into the data obj array
        tarea = setTarea(IDtarea, title);
        console.log(IDtarea, title, tarea)

        //3. create the CONTAINER for tareas
        createContainer(IDtarea);

        //4. create a BOX that will contain title, buttons and progress bar
        createTareaBox(IDtarea, title);
        console.log(title)
        // title = ''; //return input to empty -----> does not
        event.target.value = '';


        //5. create and add a confirm button 
        createConfirmBtn(IDtarea);  //ex  toConfirm()

        //6. create and add a delete button for TAREA
        createDeleteBtn(IDtarea);  //ex toDeleteTarea

        // create Box to contain the percentage subtareas done
        createPercentageBox(IDtarea)

        //7. create INPUT for subtareas
        createSubInputBar(IDtarea);

        //8. create and add event listener for sub INPUT
        addEventListenerSubTarea(IDtarea)
        
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////CREATE DIVS FOR TAREA/////////////////////////////////////////////

function createContainer(IDtarea) {
    let container = document.createElement(`div`);
    document.querySelector(`.tareas`).appendChild(container);
    container.className = `container-${IDtarea}`;   //ex globalBox-
}

//create BOX for each tarea(title, btns and percentage box)
function createTareaBox(IDtarea, title) {
    let tareaBox, tareaTitle;
    //create box
    tareaBox = document.createElement('div');
    document.querySelector(`.container-${IDtarea}`).appendChild(tareaBox);
    tareaBox.className = `tareaBox-${IDtarea}`;   //ex mainTitle-

    //add tarea title
    tareaTitle = document.createElement('div');
    tareaTitle.innerText = title;
    tareaBox.appendChild(tareaTitle);
}

function createPercentageBox(IDtarea){
    percentageBox = document.createElement('div');
    percentageBox.textContent = '';
    document.querySelector(`.tareaBox-${IDtarea}`).appendChild(percentageBox)
    percentageBox.className = `percentageDone-${IDtarea}`;
}

function createSubInputBar(IDtarea) { // ex createSubInput
    let subInputBox = document.createElement('div');
    document.querySelector(`.container-${IDtarea}`).appendChild(subInputBox);
    subInputBox.className = `subInputBox-${IDtarea}`;

    let subInputBar = document.createElement('input');
    subInputBox.appendChild(subInputBar);
    subInputBar.className = `subInputBar-${IDtarea}`;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////CREATE TAREA BTN///////////////////////////////////////////////////

function createConfirmBtn(IDtarea) { // ex toConfirm
    let completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="far fa-check-circle"></i>';
    document.querySelector(`.tareaBox-${IDtarea}`).appendChild(completedBtn);

    completedBtn.addEventListener('click', event => {
        event.target.parentNode.parentNode.parentNode.classList.add('completed');
        let x = document.getElementsByName(`checkBox-${IDtarea}`)
        console.log(x);
        let i;
        for (i = 0; i < x.length; i++) {
        x[i].checked = "true";
        }
    })
}

function createDeleteBtn(IDtarea) { //ex toDeleteTarea
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
    document.querySelector(`.tareaBox-${IDtarea}`).appendChild(deleteBtn);

    deleteBtn.addEventListener('click', event => {
        console.log(event.target.parentNode);
        console.log(event.target.parentNode.parentNode);
        console.log(event.target.parentNode.parentNode.parentNode);

        //remove in data obj array
        deleteTarea(IDtarea);
        //remove tarea from the UI
        console.log(data.tareas)
        event.target.parentNode.parentNode.parentNode.remove();

    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// SUBINPUT EVENT LISTENER///////////////////////////////////////////
function addEventListenerSubTarea(IDtarea, num) {
    document.querySelector(`.subInputBar-${IDtarea}`).addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            let arr, IDtareaInput, IDsubTarea, location, percentage;
            location = event.target;
            console.log('has pulsado enter y has escrito un subtarea' + location.value);
            console.log(location)
            //1. capture the class name from the event and get the IDtarea of the input clicked
            arr = location.parentNode.className.split(`-`);
            console.log(arr);
            IDtareaInput = arr[1];
            console.log(IDtareaInput);
            //2.get the ID of the subtarea
            IDsubTarea = getIDsubTarea(IDtareaInput);
            console.log(IDsubTarea);
            //3. set the subtarea(id and title) into the data obj array
            setSubTareas(IDtareaInput, IDsubTarea, location.value);

            //4. get the percentage of subtareas done
            percentage = getPercentage(IDtareaInput);
            setUIPercentage(percentage, IDtareaInput);

            //4. create a CONTAINER to contain  ALL the subtareas, IF one DOESNT exist
            console.log(location.parentNode.nextSibling);
            if (location.parentNode.nextSibling === null) {
                createSubTareaContainer(IDtareaInput);
            }

            //5. create a BOX for EACH subtarea
            createSubTareaBox(IDtareaInput, IDsubTarea);

            //6. add the subtarea to the UI 
            createSubTitle(IDtareaInput, IDsubTarea, location.value);
            location.value = ''; //return input to empty

            //8.add buttons to subtarea:     
            createCheckBox(IDtareaInput, IDsubTarea)
            createEditBtn(IDtareaInput, IDsubTarea);  //ex toEditBtn()
            createSubTareaDeleteBtn(IDtareaInput, IDsubTarea);   //ex toDEleteSubTarea()

            // console.log(data.tareas)


        }
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////SUB TAREA DIVS/////////////////////////////////////////////////

//Create a BOX for ALL subtareaS
function createSubTareaContainer(IDtareaInput) {
    let subTareas = document.createElement('div');
    document.querySelector(`.container-${IDtareaInput}`).appendChild(subTareas);
    subTareas.className = `subTareas-${IDtareaInput}`;
}

//create a  BOX for EACH subtarea
function createSubTareaBox(IDtareaInput, IDsubTarea) {
    let subTarea = document.createElement('div');
    document.querySelector(`.subTareas-${IDtareaInput}`).appendChild(subTarea);
    subTarea.className = `subTarea-${IDtareaInput}-${IDsubTarea}`;
}

//add the subtarea TITLE in UI
function createSubTitle(IDtareaInput, IDsubTarea, subTareaTitle) {

    let inputSubTarea = document.createElement('div');
    document.querySelector(`.subTarea-${IDtareaInput}-${IDsubTarea}`).appendChild(inputSubTarea);
    inputSubTarea.innerText = subTareaTitle;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////SUB TAREA CHECKBOX////////////////////////////////////////////////////

function createCheckBox(IDtareaInput, IDsubTarea) {
    let myDiv = document.querySelector(`.subTarea-${IDtareaInput}-${IDsubTarea}`);
    // creating checkbox element 
    let checkbox = document.createElement('input');

    // Assigning the attributes 
    // to created checkbox 
    checkbox.type = "checkbox";
    checkbox.name = `checkBox-${IDtareaInput}`;
    checkbox.value = "value";
    checkbox.id = `checkBox-${IDtareaInput}-${IDsubTarea}`;

    let att = document.createAttribute("onchange");
    att.value = "subTareaDone(this, this.id)";
    checkbox.setAttributeNode(att);
    // appending the checkbox 
    myDiv.appendChild(checkbox);
    
}

function subTareaDone(checkBoxElem, checkBoxID) {
    let arr, cBoxIDtarea, cBoxIDsubTarea, percentage;
    console.log(checkBoxElem)
    console.log(checkBoxID)
    console.log(checkBoxElem.parentNode.parentNode.previousSibling.previousSibling);
    arr = checkBoxID.split('-')
    cBoxIDtarea = arr[1];
    cBoxIDsubTarea = arr[2]; 
    if (checkBoxElem.checked) {
        console.log(arr, cBoxIDtarea, cBoxIDsubTarea)
        //update the data obj
        updateDone(cBoxIDtarea, cBoxIDsubTarea);
        //data.tareas[cBoxIDtarea].subtareas[cBoxIDsubTarea].done = true;
        
        //update the UI
        percentage = getPercentage(cBoxIDtarea);
        setUIPercentage(percentage, cBoxIDtarea)
        //document.querySelector('#p1').MaterialProgress.setProgress(percentage);
        ////setProgress1(percentage);   ON HOLD

    } else {
        console.log('unchecked')
        //update the data obj
        data.tareas[arr[1]].subtareas[arr[2]].done = false;
        //update the UI
        percentage = getPercentage(arr[1]);
        console.log(percentage)
        setUIPercentage(percentage, arr[1])
        //document.querySelector('#p1').MaterialProgress.setProgress(percentage);
        //setProgress1(percentage);//////////ON HOLD
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////SUB TAREA BUTTONS/////////////////////////////////////////////////

function createEditBtn(IDtareaInput, IDsubTarea) {
    let editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class="fas fa-pencil-alt"></i>`;
    document.querySelector(`.subTarea-${IDtareaInput}-${IDsubTarea}`).appendChild(editBtn);

    // editBtn.addEventListener('click', event => {
    //     let node1 = event.target.previousSibling;
    //     if (node1.contentEditable == 'false') {
    //         node1.contentEditable = 'true';
    //         node1.focus() //focus sobre el input
    //         editBtn.innerText = 'Ok';
    //     } else if (node1.contentEditable == 'true') {
    //         node1.contentEditable = 'false';
    //         editBtn.innerText = '🖉';
    //     }
    // })
}

function createSubTareaDeleteBtn(IDtareaInput, IDsubTarea) {
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = `<i class="far fa-times-circle"></i>`;
    document.querySelector(`.subTarea-${IDtareaInput}-${IDsubTarea}`).appendChild(deleteBtn);

    deleteBtn.addEventListener('click', event => { 
        console.log(event.target.parentNode);
        //remove in data obj                //////put in the index function
        let ids = data.tareas[IDtareaInput].subtareas.map(current => current.idSub);
        let index = ids.indexOf(IDsubTarea);

        if (index !== -1) {
            data.tareas[IDtareaInput].subtareas.splice(index, 1);
        }

        //update percentage
        let percentage = getPercentage(IDtareaInput);
        //set percentage
        setUIPercentage(percentage, IDtareaInput);

        //remove on UI
        console.log(event.target.parentNode.parentNode)
        event.target.parentNode.parentNode.remove();

        console.log(data.tareas)
    })    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////PERCENTAGES/////////////////////////////////////////////////////////

function setUIPercentage(percentage, IDtarea){

    console.log('okaaayyy')
    // let html = `<div class='percentageDone'>%percentage%</div>`
    // newHtml = html.replace("%percentage%", percentage)
    // console.log('im here', newHtml)
    //newHtml = newHtml.replace("%value%", formatNumber(obj.value,type));
    
    //document.querySelector(`.tareaBox-${cBoxIDtarea}`).insertAdjacentHTML('afterend', newHtml)
    console.log(document.getElementById(`.percentageDone-${IDtarea}`))
    document.querySelector(`.percentageDone-${IDtarea}`).textContent = `${percentage}%`;
}


///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////SEARCH BAR EVENT LISTENER/////////////////////////////////////////////
document.querySelector('.inputBuscar').addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        console.log('has pulsado enter y has escrito' + event.target.value);
        let search = event.target.value;
        let pattern = /[search]/i
        event.target.value = '';
        console.log(search, pattern);

        matchTarea(pattern);
    }
})        




///////////////////////////////////////////////////////////////////////////////////////////////7
//////////////////////ON HOLD//////////////////

// function setProgress1(percentage) {
//     document.querySelector('#p1').addEventListener('mdl-componentupgraded', function () {
//         console.log(this)
//         this.MaterialProgress.setProgress(44);
//     });
// }

// function createProgressBar(ID) {

//     //<!-- Simple MDL Progress Bar -->

//     console.log('here!!!!!!!')
//     let html = `<div id="p1" class="mdl-progress mdl-js-progress"></div>`
//     document.querySelector(`.mainTitle-${ID}`).insertAdjacentHTML("afterend", html)
//     document.querySelector('#p1').addEventListener('mdl-componentupgraded', function () {
//         this.MaterialProgress.setProgress(0);
//     });

// }

// function search(event){
//     let word = event.target.value;
//     data.tareas.filter(tarea => tarea.titulo ===)
// }

////////////////////////////////////////////////////////////////////////////////////////////7
////////////////////////////////////////////////////////////////////////////////////////