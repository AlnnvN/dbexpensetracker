const nameinput = document.getElementById("input-name");
const dateinput = document.getElementById("input-date");
const amountinput = document.getElementById("input-number");

const addbutton = document.getElementById("btn1");

const table1 = document.getElementById("table1");

var names = [];
var isRepeated;


addbutton.addEventListener('click',()=>{

    let row, nametd, datetd, amounttd, delbtntd, delbtn; 

    isRepeated = false;

    for (let b = 0; b < names.length; b++) //verifica repetições comparando input com array de nodes já listados
    {
        if(names[b].innerHTML == nameinput.value)
        {
            isRepeated = true;
        }
    }
         
    if(nameinput.value != '' && nameinput.value[0] != ' ' 
    && dateinput.value != '' && amountinput.value != '' 
    && amountinput.value >= 0 && isRepeated === false)
    {
        criarElementos();
        caracElementos();
        appendElementos();
        indexNames();
    }
    
    
    //FUNÇÕES
    function criarElementos()
    {
        row = document.createElement('tr'); //cria nova fileira

        nametd = document.createElement('td'); //cria elementos da fileira
        datetd = document.createElement('td');
        amounttd = document.createElement('td');
        delbtntd = document.createElement('td'); 
    
        delbtn = document.createElement('button');

        return;
    }
    
    function caracElementos()
    {
        nametd.classList.add('tdata'); //caracteriza nome e recebe valor
        nametd.appendChild(document.createTextNode(nameinput.value));
        datetd.classList.add('tdata'); //data
        datetd.appendChild(document.createTextNode(dateinput.value));
        amounttd.classList.add('tdata'); //amount
        amounttd.appendChild(document.createTextNode("$"+amountinput.value));
        
        delbtn.id = 'delbtn';  //caracteriza o elemento botão
        delbtn.appendChild(document.createTextNode("X"));
        
        delbtn.addEventListener('click',()=>{
            delbtn.parentElement.parentElement.children[0].firstChild.remove();
            delbtn.parentElement.parentElement.remove();
            
        });
    
        delbtntd.classList.add('tbutton'); //caracteriza o elemento TD do botão
        delbtntd.appendChild(delbtn);//atribui botão ao seu TD
        
        return;
    }
    
    function appendElementos()
    {
        row.appendChild(nametd);//atribui name à fileira
        row.appendChild(datetd);//data
        row.appendChild(amounttd);//amount
        row.appendChild(delbtntd);//atribui botao à fileira
    
        table1.appendChild(row); //atribui fileira à tabela

        nameinput.value = ""; //zera dados preenchidos
        dateinput.value = "";
        amountinput.value = "";
    }

    function indexNames() //coloca nodes no array para comparação de repetições
    {
        for (let i = 0; i < table1.children.length-1; i++) 
        {
            names[i] = table1.children[i+1].children[0];
        }
    }
})


