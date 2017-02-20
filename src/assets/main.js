let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
answer.value = setHiddenFields();

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    // set hidden on initial run
    if(attempt.value === 0){
      answer.value = setHiddenFields();
    }

    //validate input and return if false
    if(validateInput(input.value)){
      attempt.value++;
    }
  else{
    return false;
  }

  //Run Check
  if(getResults(input.value,answer.value)){
    setMessage("You Win! :)");
    showAnswer(answer.value,true);
    showReplay();
  } else if (attempt.value > 9 ){
      setMessage("You Lose! :(");
      showAnswer(answer.value,false);
      showReplay();
  } else{
      setMessage("Incorrect, try again.");
  }

}

//implement new functions here
function fourDigits(str){
  while(str.length < 4) {
    str = "0" + str;
  }
  return str;
}

function setHiddenFields(){
    let answer = Math.floor(Math.random() * 10000);//.toString();
    console.log(fourDigits("answer =" +answer));
    return fourDigits(answer);
}
function setMessage(val){
  let output = document.getElementById('message');
  output.innerHTML = val;
  return output;
}
function validateInput(val){
  //Number of character Check
  if(val.length === 4){
    return true;
  }
  else{
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}
function isValueInString(a,b){
  for(let i=0; i < 4; i++){
    if(a == b[i]){
      return true;
    }
  }
  return false;
}
function getResults(val,answer){
  tag = document.getElementById('results');
  let glyphs = "";
  val = fourDigits(val);
  let correct = 0;

  for(let i = 0; i < 4; i++){
    if(val[i] == answer[i]){
      //match
      glyphs = glyphs + '<span class="glyphicon glyphicon-ok"></span>';
      correct++;
    }
    else if(isValueInString(val[i],answer)){
      //vlaue not in place
      glyphs = glyphs + '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      //value does not exist
      glyphs = glyphs + '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  tag.innerHTML = tag.innerHTML + '<div class="row"><strong class="col-md-6">' + val + '</strong><strong class="col-md-6">' + glyphs +'</strong></div>';
  correct = correct === 4 ? correct = true : correct = false;
  return correct;
}
function showAnswer(val,bool){
  if(bool){
    document.getElementById('code').className = "code success";
  }else {
    document.getElementById('code').className = "code failure";
  }
  document.getElementById('code').innerHTML = "<strong>"+ val +"</strong>" ;
}

function showReplay(){
  document.getElementById('guessing-div').style.display = "none";
  document.getElementById('replay-div').style.display = "block";
}
