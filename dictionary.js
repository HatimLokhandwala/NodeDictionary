//==============================================================================================//
//Author : Hatim Lokhandwala
// MTech CSE IIT Hyderabad
// Application :   A NODE based command line dictionary 
//Providing features such as antonyms, synonyms usage etc of words in the dictionary.
//==============================================================================================//

var reader = require('readline'); //the required library to perform read write operations
var wordnikClient = require('node-rest-client').Client;
var limitV =15;
var gFlag = false;
var rwInterface = reader.createInterface({
        input : process.stdin,  // input stream 
        output : process.stdout // output stream
 });

var wordNikURL = "http://api.wordnik.com/v4/word.json/";
var keyTag = "api_key";
var keyValue = "fb335e77eece4e5fea00002f98a098bf24a1414328f4966c8";

//callBack on connection to wordnik apis.
function swaggerSuccessCallBack(){
  console.log("success");

}

var wordNikObj = new wordnikClient({
  url: wordNikURL,
  success:swaggerSuccessCallBack()
});

// var swagger = new client({
//   url: 'http://petstore.swagger.io/v2/swagger.json',
//   success: function() {
//     swagger.pet.getPetById({petId:7},{responseContentType: 'application/json'},function(pet){
//       console.log('pet', pet);
//     });
//   }
// });


//Set the prompt
rwInterface.setPrompt("dict>");
//Put the prompt 
rwInterface.prompt();

//Event when an enter is pressed
rwInterface.on('line',function(line){
    line = line.trim();//remove extra white spaces in beginning and at the end of the word.
    // console.log("User typed" +  line);

    var ret = checkInput(line);
    if(ret== false){
        console.log("-------------------------------------------------------------------------------------");
        console.log("Improper number of arguements in the input. Refere usage");
        printUsageGuidlines();
    }

    else{
        // console.log(ret);
        var res = line.split(" ");

        switch(res[0]){
          case 'def':
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Definition(s) of the word ======> " + res[1]);
            getDefinitions(res[1],1);
            console.log("-----------------------------------------------------------------------------------------")
            // rwInterface.write("Definition\n"); 
            break;
        case 'syn' :
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Synonyms of the word " + res[1]);
            getRelatedWords(res[1],0,1);
            console.log("-----------------------------------------------------------------------------------------");
            break;
        case 'ant' :
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Antonyms of the word " + res[1]);
            getRelatedWords(res[1],1,1);
            console.log("-----------------------------------------------------------------------------------------");
            break;
        case 'ex' :
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Examples of the word " + res[1]);
            getExamples(res[1]);
            console.log("-----------------------------------------------------------------------------------------");
            break;
        case 'detWord' :
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Details of the word " + res[1]);
            console.log("-----------------------------------------------------------------------------------------");
            break;
        case 'det' :
            console.log("-----------------------------------------------------------------------------------------");
            console.log("Details of the word of the day ");
            console.log("-----------------------------------------------------------------------------------------");
            break;
        default: 
            console.log("-----------------------------------------------------------------------------------------");
            console.log("You have mistyped the input command.  Following is the usage details");
            printUsageGuidlines();
            break;
        }
    }
  // rwInterface.prompt();
});


//function to check the correctness of the input line entered
function checkInput(line){
    if(line=="") return false; //empty string

    //split on basis of space we have removed the trailing and ending white space above
    var res = line.split(" ");
    
    // console.log(res.length);
    
    if(res[0]=="det" && res.length>=2) return false; //if command is det then second arguement should not be there

    if(res.length>=3 ) return false;// correct input must have 2 arguements.

  return true;//return true after all checks
}

//function to print the usage Guidlines
function printUsageGuidlines(){
    console.log("|| ------------------------------------ Usage: ----------------------------------------||");
    console.log("|| 1. def <word>      would provide with the definition of the specified word          ||");
    console.log("|| 2. syn <word>      would provide with the synonyms of the specified word            ||");
    console.log("|| 3. ant <word>      would provide with the antonyms of the specified word            ||");
    console.log("|| 4. ex <word>       would provide with the example usage(s) of the specified word    ||");
    console.log("|| 5. detWord <word>  would provide all the details associated with the specified word ||");
    console.log("|| 6. det             would provide all the details of the word of the day             ||");
    console.log("|| ------------------------------------------------------------------------------------||")
    putPrompt();
}


function putPrompt(){
    rwInterface.prompt();
}

//----------------------------------------------------------
// functions to perform the required operations
//word : word whose definition is requires
//flag : whether to put the prompt in the end.
function getDefinitions(word,pFlag){
    //Generating URL of the form   http://api.wordnik.com/v4/word.json/<word>/definitions?api_key=***

   var requestURL = wordNikURL +  word + "/definitions?" +  keyTag + "=" + keyValue + "&limit=" + limitV;
   var args = {headers: {'Accept':'application/json'}};

   wordNikObj.get(requestURL, args, function (data, response) {
      // Once the statusCode is 200, the response has been received with no problems
      // console.log(response.statusCode + " " + data);
      if (response.statusCode === 200) {
        // Parse the JSON received as the response 
        //result has the JSON formatted data.

        var result = JSON.parse(data); // ret val is the array of JSON objects
          // console.log(result.length);
          //if res len is 0 then the input word is improper
         if(result.length == 0) printWordError(word);
         //else the result contains an array of JSON objects and in each object there is a field called 'text'
         else{
            var count=1;
            for(var iter in result){
            //text field in each JSON object contains the definition
                console.log("|--- " + count+ ". "+ result[iter].text);
                count++;
            }        
        }
      }
      //simply put the prompt
      if(pFlag) putPrompt(); 
  });

}

//get Antonyms and Synonyms for the given word
// word : word for which the antonym/ synonym  is required
//flag : 0 for synonym , 1 for antonym
//pFlag : whether to put prompt in the end.
function getRelatedWords(word,flag,pFlag){
    var requestURL, args;
    var relType = "relationshipTypes";
    //synonym
    if(flag==0){
      requestURL = wordNikURL +  word + "/relatedWords?" + relType +"=" +"synonym&" + keyTag + "=" + keyValue;
      args = {headers: {'Accept':'application/json'}};
    }
    //antonym
    else{
      requestURL = wordNikURL +  word + "/relatedWords?" + relType +"=" +"antonym&" + keyTag + "=" + keyValue;
      args = {headers: {'Accept':'application/json'}};
    }

    wordNikObj.get(requestURL, args, function (data, response) {
    // Once the statusCode is 200, the response has been received with no problems
    // console.log(response.statusCode + " " + data);
      if (response.statusCode === 200) {
        
        // Parse the JSON received as the response 
        // result has the JSON formatted data.

        var result = JSON.parse(data); // ret val is the array of JSON objects
        // console.log(result.length);
        //if result length is 0 then there is improper word in input

        if(result.length == 0) printWordError(word);
        
        else{
          // Return object is the JSON array with 1 object
          // Each object has a key called words and the value corresponding to is again an array of required synonyms / antonyms
          var wordList = result[0].words; //here it could be a loop but only one object is there so we straight get 0th value
          var count=1;
          for(var iter in wordList){
            console.log("|--- " + count + ". "+ wordList[iter]);
            count++;
          }         
        }
      }
      //simply put the prompt if flag is true
      if(pFlag) putPrompt(); 
  });
}


//Get Exmaple usages of the word
//word: input word
//pFlag: whether to put the prompt in the end
function getExamples(word,pFlag){
   //Generating URL of the form   http://api.wordnik.com/v4/word.json/<word>/examples?api_key=***
   //NOTE : we also put limit to restrict the no. of search results.
   var requestURL = wordNikURL +  word + "/examples?" +  keyTag + "=" + keyValue +"&limit=" + limitV;
   var args = {headers: {'Accept':'application/json'}};

   wordNikObj.get(requestURL, args, function (data, response) {
      // Once the statusCode is 200, the response has been received with no problems
    
      if (response.statusCode === 200) {
        // Parse the JSON received as the response 
        //result has the JSON formatted data.

        var result = JSON.parse(data); // ret val is the array of JSON objects
          
         //Here it would be empty JSON object in other cases it is empty JSON array
         if(Object.keys(result).length==0) printWordError(word);

         // else the result contains a JSON object with key examples and value as a JSON aray
         // in that each JSON object has a field called text that is of our use.

         else{
            var exampleList = result.examples;
            var count = 1;
            for(var iter in exampleList){
            //text field in each JSON object contains the example
              console.log("|-- " +count  + ". "+ exampleList[iter].text);
              count++;
            }        
        }
      }
      //simply put the prompt
      if(pFlag)putPrompt(); 
  });

}

//------------------------------------------------------------------------------
function printWordError(word){
  console.log("!!!!!!!!!!!!!!!!!!!!!     ERROR       !!!!!!!!!!!!!!!!!!!!!");
  console.log("Improper Word: word '" + word  + "' does not exists in the dictionary OR \nno data found w.r.t to the typed input command");
}
//------------------------------------------------------------------------------











