'use strict';
const container=document.getElementById('container');
const firstImage=document.getElementById('firstImage');
const secondImage=document.getElementById('secondImage');
const thirdImage=document.getElementById('thirdImage');

let imageItems=[    'bag.jpg',
'banana.jpg',
'bathroom.jpg',
'boots.jpg',
'breakfast.jpg',
'bubblegum.jpg',
'chair.jpg',
'cthulhu.jpg',
'dog-duck.jpg',
'dragon.jpg',
'pen.jpg',
'pet-sweep.jpg',
'scissors.jpg',
'shark.jpg',
'sweep.png',
'tauntaun.jpg',
'unicorn.jpg',
'usb.gif',
'water-can.jpg',
'wine-glass.jpg'];


let clickTotal=0;
let previousImages=[];


   

let Sections = function(name) {
    this.name = name;
    this.img = `./img/${name}`;
    this.shown = 0;
    this.clicks = 0;
    Sections.all.push(this);
};
Sections.all = [];



for(let i=0;i<imageItems.length;i++){
new Sections(imageItems[i]);
}
let firstIndex;
let secondIndex;
let thirdIndex;

let firstImageIndex=0;
let secondImageIndex=0;
let thirdImageIndex=0;



function renderImage(){
    do{
        firstIndex=getRandom(0,imageItems.length-1);
    }while(previousImages.includes(firstIndex));
     
    do{
         secondIndex=getRandom(0,imageItems.length-1);
     
    }while(firstIndex===secondIndex || previousImages.includes(secondIndex));

    do{
        thirdIndex=getRandom(0,imageItems.length-1);
    }while(firstIndex===thirdIndex || secondIndex===thirdIndex || previousImages.includes(thirdIndex));

    firstImage.src=Sections.all[firstIndex].img;
    secondImage.src=Sections.all[secondIndex].img;
    thirdImage.src=Sections.all[thirdIndex].img;

    Sections.all[firstIndex].shown++;
    Sections.all[secondIndex].shown++;
    Sections.all[thirdIndex].shown++;

    firstImageIndex=firstIndex;
    secondImageIndex=secondIndex;
    thirdImageIndex=thirdIndex;

    previousImages=[firstIndex,secondIndex,thirdIndex];
}

renderImage();

if(localStorage.getItem('data')){
    let dataFromStorage=localStorage.getItem('data');
    let dataAsObject=JSON.parse(dataFromStorage);
    Sections.all=dataAsObject;
}

container.addEventListener('click', handler);
function handler(event){
    if((event.target.id ==='firstImage' ||
     event.target.id==='secondImage' ||
     event.target.id==='thirdImage') && clickTotal<25)  {
     clickTotal++;

     if(event.target.id==='firstImage'){
         Sections.all[firstImageIndex].clicks++;
     }
     if(event.target.id==='secondImage'){
        Sections.all[secondImageIndex].clicks++;
     }
     if(event.target.id==='thirdImage'){
        Sections.all[thirdImageIndex].clicks++;
     }

     renderImage(); }

    /// Local storage
    var dataAsString=JSON.stringify(Sections.all);
    localStorage.setItem('data', dataAsString);
    
}

function getRandom(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
}


// show result
let result=document.getElementById('result');
function displayResult(){
    for(let i=0;i<imageItems.length;i++){
        let item=document.createElement('li');
        result.appendChild(item);
        item.textContent=`${Sections.all[i].name.split('.')[0]} had ${Sections.all[i].clicks} votes, and 
        was seen ${Sections.all[i].shown} times. `;
    }
    renderChart();
}


/// Chart 
    
let allClicks=[];
let shown=[];
let names=[];
function renderChart(){

    for(let i=0;i<Sections.all.length;i++){
        allClicks.push(Sections.all[i].clicks);
        shown.push(Sections.all[i].shown);
        names.push(Sections.all[i].name);
    }


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: names,
        datasets: [{
            label: '# of Votes',
            data: allClicks,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: '# of shown',
            data: shown,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

}