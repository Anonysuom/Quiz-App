function test() {
    console.log('testing')
}

let questionSpace = document.getElementById('question')
let submits = document.getElementById('click')
let radio1 = document.getElementById('radio1')
let radio2 = document.getElementById('radio2')
let radio3 = document.getElementById('radio3')
let radio4 = document.getElementById('radio4')
let radio1txt = document.getElementById('radio1txt')
let radio2txt = document.getElementById('radio2txt')
let radio3txt = document.getElementById('radio3txt')
let radio4txt = document.getElementById('radio4txt')
let app = document.getElementById('main-container')
let end = document.getElementById('end-container')
let result = document.getElementById('result')
let report = document.getElementById('report')


async function fetchJSONData() {
    let res = await fetch("./data.json")
    return await res.json()
}

let temp = await fetchJSONData()

let finalMessage="You got the following answers wrong: <br>" 
let correct = 0;
let timer
let qNo = 0;
let time = 20;

function start() {
    timer = setInterval(
        quiz,
        1000
    )
}
start()

function quiz() {
    ticktock()
    getquestion()
    submits.addEventListener("click", check);
    if (qNo == temp.questions.length - 1 && time == 0) {
        quizEnd()
    }
    else if (time == 0) {
        qNo++
        timerReset()
    }
}

function ticktock() {
    time--
    document.getElementById('timer').innerHTML = time
}

function check() {
    let answer = checkRadio()
    if (answer == temp.questions[qNo].answer) {
        correct++
    }
    else{
        updateMessage()
    }
    if (qNo == temp.questions.length - 1) {
        quizEnd()
    }
    else {
        qNo++
        timerReset()
    }
}

function checkRadio() {
    if (radio1.checked) {
        return 1
    }
    else if (radio2.checked) {
        return 2
    }
    else if (radio3.checked) {
        return 3
    }
    else if (radio4.checked) {
        return 4
    }
    else {
        return 0
    }
}

function updateMessage(){
    let that = 'option'+temp.questions[qNo].answer
    finalMessage+= '<br>The answer for question number '+(qNo+1)+' was '+ temp.questions[qNo][that]
}

function quizEnd() {
    clearInterval(timer)
    app.classList.add('hide')
    end.classList.remove('hide')
    console.log(finalMessage)
    result.innerHTML = 'You got ' + correct + ' answers correct out of ' + temp.questions.length
    report.innerHTML = finalMessage
}

function timerReset() {
    time = 20
}

function getquestion() {
    questionSpace.innerHTML = temp.questions[qNo].question
    radio1txt.innerHTML = temp.questions[qNo].option1
    radio2txt.innerHTML = temp.questions[qNo].option2
    radio3txt.innerHTML = temp.questions[qNo].option3
    radio4txt.innerHTML = temp.questions[qNo].option4
}