//==============================================================================================//
//Author : Hatim Lokhandwala
// MTech CSE IIT Hyderabad
// Application :   A NODE based command line dictionary 
//Providing features such as antonyms, synonyms usage etc of words in the dictionary.
//==============================================================================================//

var reader = require('readline'); //the required library to perform read write operations


var rwInterface = reader.createInterface({
        input : process.stdin,  // input stream 
        output : process.stdout // output stream
 });

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
        console.log("-------------------------------------------------------------------------------------");
    }

    else{
        console.log(ret);
        var res = line.split(" ");

        switch(res[0]){
          case 'def':
            console.log("-------------------------------------------------------------------------------------");
            console.log("Definition of the word " + res[1]);
            console.log("-------------------------------------------------------------------------------------")
            // rwInterface.write("Definition\n"); 
            break;
        case 'syn' :
            console.log("-------------------------------------------------------------------------------------");
            console.log("Synonyms of the word " + res[1]);
            console.log("-------------------------------------------------------------------------------------");
            break;
        case 'ant' :
            console.log("-------------------------------------------------------------------------------------");
            console.log("Antonyms of the word " + res[1]);
            console.log("-------------------------------------------------------------------------------------");
            break;
        case 'detWord' :
            console.log("-------------------------------------------------------------------------------------");
            console.log("Details of the wordof the word " + res[1]);
            console.log("-------------------------------------------------------------------------------------");
            break;
        case 'det' :
            console.log("-------------------------------------------------------------------------------------");
            console.log("Details of the word of the day ");
            console.log("-------------------------------------------------------------------------------------");
            break;
        default: 
            console.log("-------------------------------------------------------------------------------------");
            console.log("You have mistyped the input command.  Following is the usage details");
            printUsageGuidlines();
            break;
        }
    }
  rwInterface.prompt();
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
    console.log("|| 4. detWord <word>  would provide all the details associated with the specified word ||");
    console.log("|| 5. det             would provide all the details of the word of the day             ||");
    console.log("|| ------------------------------------------------------------------------------------||")

}