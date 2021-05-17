// GETTING ALL REQUIRED ELEMENTS
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".Btn .exit");
const continue_btn = document.querySelector(".Btn .continue");
const quiz_box = document.querySelector(".quiz_box");
const timer_count = document.querySelector(".timer .time_sec");
const time_line = document.querySelector("header .time_line");
const time_off = document.querySelector(".timer .time_text");
const option_text = document.querySelector(".option_list");


// START QUIZ BUTTON CLICKED
start_btn .onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the info box
}

// EXIT BUTTON CLICKED
exit_btn .onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// CONTINUE BUTTON CLICKED
continue_btn .onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestion(0);
    quescounter(1);
    startTimer(15);
    startTimerLine(0);
}

let ques_count = 0;
 let ques_numb = 1;
let counter;
let counterLine;
let time_value= 15;
let width_value = 0;
let userscore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".result_box .restart");
const quit_quiz = document.querySelector(".result_box .quit");

restart_quiz .onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    
     let ques_count = 0;
     let ques_numb = 1;
     let time_value= 15;
     let width_value = 0;
     let userscore = 0;
     showQuestion(ques_count);
     quescounter(ques_numb);
     clearInterval(counter);
     startTimer(time_value);
     clearInterval(counter);
     startTimerLine(width_value);
    next_btn.style.display = "none";
    time_off.textContent ="Time Left";
}



//next button clicked
next_btn .onclick = ()=>{
    if(ques_count < questions.length - 1)
    {   ques_count++;
         ques_numb++;
         showQuestion(ques_count);
         quescounter(ques_numb);
         clearInterval(counter);
         startTimer(time_value);
         clearInterval(counterLine);
         startTimerLine(width_value);
         next_btn.style.display = "none";
         time_off.textContent ="Time Left";
       
    }
    else{
        clearInterval(counter);
         clearInterval(counterLine);
        console.log("QUESTION COMPLETED");
        showResultbox();
    }
    
}
//getting the question from the questions array
function showQuestion(index){
    const ques_text = document.querySelector(".ques_text");
    
    let ques_tag = "<span>"+questions[index].num+". "+questions[index].question +"</span>";
    ques_text.innerHTML = ques_tag;
    let option_tag ='<div class="option"><span>'+questions[index].options[0]+'</span><div class="icon"></div></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span><div class="icon"></div></div>'
                    +'<div class="option"><span>'+questions[index].options[2]+'</span><div class="icon"></div></div>'
                    +'<div class="option"><span>'+questions[index].options[3]+'</span><div class="icon"></div></div>';
    option_text.innerHTML =option_tag;  
    
const option = option_text.querySelectorAll(".option");
    for( let i = 0; i < option.length; i++)
    {
        option[i].setAttribute("onclick","optionselected(this)");
    }
}

let tickicon =  '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon wrong"><i class="fas fa-times"></i></div>';

function optionselected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userans = answer.textContent;
    console.log(userans);
    let correctans = questions[ques_count].answer;
    let alloptions = option_text.children.length;
    
    if(userans == correctans)
    {   
        userscore += 1;
        console.log(userscore);
        answer.classList.add("correct");
        console.log("answer is correct");
        answer.insertAdjacentHTML('beforeend', tickicon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("answer is incorrect");
        answer.insertAdjacentHTML('beforeend', crossicon);
        //if anwer is incorect then automatically selected the correct answer
        for(let i = 0; i < alloptions; i++){
            if(option_text.children[i].textContent == correctans)
            {
            console.log("this is for loop");
            option_text.children[i].setAttribute("class", "option correct");
            option_text.children[i].insertAdjacentHTML('beforeend', tickicon);
            }
        }
    } 
    //once user selected diabled all options
    for (let i = 0; i < alloptions; i++) {
        option_text.children[i].classList.add("disable");
        
    }
    next_btn.style.display = "block";
}

function showResultbox()
{   
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // show the result box
    const scoretext = document.querySelector(".score_text");
    if(userscore > 3)
    {
        let scoretag ='<span>and Congrats! you got <p>'+userscore+'</p>out of<p>'+questions.length+'</p></span>';
        scoretext.innerHTML =scoretag;
    }
    else if(userscore > 1)
    {
        let scoretag ='<span>and nice, you got <p>'+userscore+'</p>out of<p>'+questions.length+'</p></span>';
        scoretext.innerHTML =scoretag;
    }
    else
    {
        let scoretag ='<span>and sorry, you got only <p>'+userscore+'</p>out of<p>'+questions.length+'</p></span>';
        scoretext.innerHTML =scoretag;
    }
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timer_count.textContent = time;
        time--;
        if(time < 9)
        {
            let addZero = timer_count.textContent;
            timer_count.textContent = "0"+addZero;
        }
        if(time < 0){
            clearInterval(counter);

            timer_count.textContent = "00";
            time_off.textContent ="Time off";
            let correctans = questions[ques_count].answer;
            let alloptions = option_text.children.length;
            for(let i = 0; i < alloptions; i++){
                if(option_text.children[i].textContent == correctans)
                {
                console.log("this is for loop");
                option_text.children[i].setAttribute("class", "option correct");
                option_text.children[i].insertAdjacentHTML('beforeend', tickicon);
                }
            }
            for (let i = 0; i < alloptions; i++) {
                option_text.children[i].classList.add("disable");
                
            }
            next_btn.style.display = "block";
        }

    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 27);
    function timer(){
        time += 1;
        time_line.style.width = time +"px";
        if(time > 600){
            clearInterval(counterLine);
           
        }

    }
}

quit_quiz .onclick = ()=>{
    window.location.reload();
}

function quescounter(index){
 const bottom_ques_count = document.querySelector(".total_ques");
let bottom_ques_counttag = '<span><p>'+index+'</p>Of<p>'+questions.length+'</p>Question</span>';
bottom_ques_count.innerHTML = bottom_ques_counttag;
}





