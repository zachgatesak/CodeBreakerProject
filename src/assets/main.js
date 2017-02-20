let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here

    // set hidden on initial run
    if(!answer.value && !attempt.count){
      let start = setHiddenFields();
      answer.value = start[0];
      attempt.count = start[1];
      console.log(attempt.count);
      console.log(answer.value);
    }

    //validate input and return if false
    if(validateInput(input.value)){
      attempt++;
    }
  else{
    return false;
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
    let attempt = 0;
    let answer = Math.floor(Math.random() * 10000).toString();
    console.log(fourDigits("answer =" +answer));
    return [fourDigits(answer),attempt];
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
  correct === 4 ? correct = true : correct = false;
  return correct;
}
