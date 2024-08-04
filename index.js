const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper #input-field"),
MistakeTag = document.querySelector(".Mistake span"),
TimeTag = document.querySelector(".time span b"),
WPM = document.querySelector(".WPM span"),
CPM = document.querySelector(".CPM span"),
tryAgainBtn = document.querySelector(".button")
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = 0;
//isTyping is set to false
let isTyping = 0;
//WPM
let wordpermin = 0;
let Cpmpmin=0;
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
// Math.random():
//     Generates a random decimal number between 0-1 * paragraph.length 
//     Multiplies the random number by the length of the paragraph variable,  Math.floor(): Rounds the result of the multiplication down to the nearest integer.
paragraphs[randIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`
    typingText.innerHTML += span;
});
// The code dynamically displays a randomly chosen paragraph, character by character, with each character enclosed in a span element.
inpField.addEventListener("input",initTyping);//executes inittyping for every input on inpfield
tryAgainBtn.addEventListener("click", resetGame);//Resets game executes resetGame func

document.addEventListener("keydown",() => inpField.focus())
// This line sets up an event listener that listens for any key press on the entire document (the web page).
typingText.addEventListener("click",() => inpField.focus())
// This line sets up an event listener that listens for clicks on an element with the ID typingText.
}
function initTyping() {
    const characters = typingText.querySelectorAll("span");//puts every span letter in characters array
    let Typedchar = inpField.value.split("")[charIndex];//splits every typed character in the inpfield
    if (Typedchar === " ") {
        wordpermin++;
    }
    if (!isTyping) {//To stop continious executing of initTimer every key clicked cause initTyping executes every key clicked
        //executes the initTimer function everysecond
        timer = setInterval(initTimer,1000)
        isTyping = true;
    }
    //execute inittimer in 1000 miliseconds or 1 second interval
   
    if (Typedchar == null) {
        charIndex--;
        //when we erase mistakes decrments mistake
     if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
        
     }
        characters[charIndex].classList.remove("correct","incorrect");
    } else {
    if (characters[charIndex].innerText === Typedchar) {//checks current typed and span element
        characters[charIndex].classList.add("correct");//gives a class of correct to span element
    }
    else{
        mistakes++;
        characters[charIndex].classList.add("incorrect");//gives a class of incorrect to span element
    }
    // if (characters[charIndex].innerText !== Typedchar) {//checks current typed and span element
    //     characters[charIndex].classList.add("incorrect");//gives a class of incorrect to span element
    // }
    charIndex++;//increments charindex
    
}
   characters.forEach(span => span.classList.remove("active"));//removes active element from previous element
   characters[charIndex].classList.add("active");//Gives active element
   MistakeTag.innerText = mistakes;
   CPM.innerText = charIndex-mistakes;//CPM will not count mistakes
   WPM.innerText = wordpermin;//Every space typed a word is counted
   
}
function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        TimeTag.innerText = timeLeft;
    }
    else{
        // serves to stop a repeating timer that was previously set up using
        clearInterval(timer)
        $('#input-field').attr('disabled','disabled');
    }  
}
function resetGame() {
    clearInterval(timer);
    randomParagraph();
    $('#input-field').removeAttr('disabled');
    inpField.value = "";
    timeLeft = 60;
    charIndex = 0;
    TimeTag.innerText = timeLeft;
    WPM.innerText = 0;
    MistakeTag.innerText = 0;
    CPM.innerText = 0;
    wordpermin = 0;
    mistakes = 0;
    isTyping = 0;
    location.reload();
}
randomParagraph();//generates a random paragraph
// initTyping()






