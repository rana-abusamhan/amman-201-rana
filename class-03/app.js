let userName=prompt("Please enter your name");
alert("Your name is " + userName );

let myName=prompt("my name is aya?","yes or no").toLowerCase();
if(myName=='yes' || myName=='y'){
alert("thats corecct my name is aya! ");}
else if (myName=='no' || myName=='n'){
alert("thats incorecct my name is aya! ");
}
else{
    alert("You should write yes or nox ");
    myName=prompt("my name is aya?","yes or no").toLowerCase();
    
}

let myAge=prompt("my age is 25?","yes or no").toLowerCase();
if(myAge=='yes' || myAge=='y'){
alert("thats incorecct my age is 25! ");}
else{
alert("thats corecct my age is 27! ");
}



let guessNumber=prompt("What is the number in my mind","between 5 and 10");
let score=0;
for (let i = 0; i <4; i++) {
    if (guessNumber==7){
        alert("yes it is correct, the number is 7");
        score++;
        break;
        }
    else if(guessNumber<5){
        alert("too low");
         guessNumber=prompt("What is the number in my mind","between 5 and 10");
    }
    else if(guessNumber>10){
    alert("too high");}
     guessNumber=prompt("What is the number in my mind","between 5 and 10");
}
alert("the correct number is 7");

let myColor=['red','blue'];
let guessMyColor=prompt("What is my favourite color",myColor);

for (let i = 0; i <5; i++) {
    if(guessMyColor==myColor[0] || guessMyColor==myColor[1]){
        alert('its right this is one of my colors');
        score++;
        break;
    }
    else{
        alert('its wrong this is not one of my colors');
        guessMyColor=prompt("What is my favourite color",myColor);
    }
}

alert('my best colors is ' + myColor);
alert("your score: "+ score);