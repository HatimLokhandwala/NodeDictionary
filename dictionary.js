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
    console.log("User typed" +  line);
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
          console.log("You have mistyped the commands Following is the usage details");
          break;
    }
    // console.log(res[0] +"        "+ res[1]);
  rwInterface.prompt();
});
//{
  
// };
// // var flag  = true; 
// // while(flag){
//   rwInterface.setPrompt("dict>");
//   rwInterface.prompt();
//   flag = false;
// // }
