const nameinput = document.getElementById("input-name");
const dateinput = document.getElementById("input-date");
const amountinput = document.getElementById("input-number");

const addbutton = document.getElementById("btn1");

const table1 = document.getElementById("table1");

var storageName = 'expense-tracker-local-storage';
var hasLoaded = false;

loadItems();

addbutton.addEventListener('click',()=>{

    var currentNoteIndex = table1.children.length-1;

    let isRepeated = false;
    checkForRepetitions();
         
    newItem(isRepeated, currentNoteIndex);

    function checkForRepetitions() {
        let names = table1.children;
        for (let b = 1; b < names.length; b++) //verifica repetições comparando input com array de nodes já listados
        {
            if (names[b].children[0].innerHTML == nameinput.value) {
                isRepeated = true;
            }
        }
    }
    
})


//FUNÇÕES

function loadItems(){

    for (let i = 0; i < retrieveStorageArray().length; i++) {
        newItem(false,i);
    }

    hasLoaded = true;
    
}

function newItem(isRepeated, currentNoteIndex) {
    let row, nametd, datetd, amounttd, delbtntd, delbtn;
    let addValidation;
    if(hasLoaded)
    {
        addValidation = (nameinput.value != '' && nameinput.value[0] != ' '
        && dateinput.value != '' && amountinput.value != ''
        && amountinput.value >= 0 && isRepeated === false); //conditions for valid addition
    }
    else{
        addValidation = true;
    }
    

    if (addValidation) //MAIN
    {
        criarElementos();
        caracElementos();
        appendElementos();
    }

    function criarElementos() {
        row = document.createElement('tr'); //cria nova fileira
        nametd = document.createElement('td'); //cria elementos da fileira
        datetd = document.createElement('td');
        amounttd = document.createElement('td');
        delbtntd = document.createElement('td');
        delbtn = document.createElement('button');

        return;
    }

    function caracElementos() {
        nametd.classList.add('tdata'); //caracteriza nome e recebe valor
        datetd.classList.add('tdata'); //data
        amounttd.classList.add('tdata'); //amount
        delbtn.id = 'delbtn'; //caracteriza o elemento botão
        
        if(hasLoaded)
        {
            editNameStorage(currentNoteIndex, nameinput.value);
            editDateStorage(currentNoteIndex, dateinput.value);
            editAmountStorage(currentNoteIndex, "$" + amountinput.value);
        }
        
        nametd.appendChild(document.createTextNode(retrieveStorageIndex(currentNoteIndex).name));
        datetd.appendChild(document.createTextNode(retrieveStorageIndex(currentNoteIndex).date));
        amounttd.appendChild(document.createTextNode(retrieveStorageIndex(currentNoteIndex).amount));

        
        delbtn.appendChild(document.createTextNode("X"));

        delbtn.addEventListener('click', () => {

            
            removeStorage(findIndexofArray(JSON.parse(localStorage.getItem(storageName)),delbtn.parentElement.parentElement.children[0].innerHTML));
            
            delbtn.parentElement.parentElement.children[0].firstChild.remove();
            delbtn.parentElement.parentElement.remove();
        });


        delbtntd.classList.add('tbutton'); //caracteriza o elemento TD do botão
        delbtntd.appendChild(delbtn); //atribui botão ao seu TD

        return;
    }

    function appendElementos() {
        row.appendChild(nametd); //atribui name à fileira
        row.appendChild(datetd); //data
        row.appendChild(amounttd); //amount
        row.appendChild(delbtntd); //atribui botao à fileira

        table1.appendChild(row); //atribui fileira à tabela

        if(hasLoaded)
        {
            nameinput.value = ""; //zera dados preenchidos
            dateinput.value = "";
            amountinput.value = "";
        }
        
    }
}

function resetStorage()
{
    localStorage.setItem(storageName,'[[],[]]');
}

function editNameStorage(index,value)
{
    let storage = JSON.parse(localStorage.getItem(storageName));
    storage[index] = [];
    storage[index][0] = value; 
    localStorage.setItem(storageName,JSON.stringify(storage))
    return;
}

function editDateStorage(index,value)
{
    let storage = JSON.parse(localStorage.getItem(storageName));
    storage[index][1] = value; 
    localStorage.setItem(storageName,JSON.stringify(storage))
    return;
}

function editAmountStorage(index,value)
{
    let storage = JSON.parse(localStorage.getItem(storageName));
    storage[index][2] = value; 
    localStorage.setItem(storageName,JSON.stringify(storage))
    return;
}

function removeStorage(index)
{
    let storage = JSON.parse(localStorage.getItem(storageName));
    storage.splice(index,1);
    localStorage.setItem(storageName,JSON.stringify(storage))
    return;
}

function retrieveStorageArray(){
    let storage = JSON.parse(localStorage.getItem(storageName));
    return storage;
}

function retrieveStorageIndex(index)
{
    let storage = JSON.parse(localStorage.getItem(storageName));
    let name = storage[index][0];
    let date = storage[index][1];
    let amount = storage[index][2];
    return {name,date,amount};
}

function findIndexofArray(array, value){
    let index;
    for (let i = 0; i < array.length; i++) {
        if(value === array[i][0])
        {
            index = i;
            break;
        }
    }
    return index;
}