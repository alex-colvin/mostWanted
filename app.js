/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            searchResults = searchByTraits(people);
            alert(searchResults);
            app(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = promptFor(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`, chars
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
            // mainMenu(person[0], people);
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person[0], people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}
Last Name: ${person.lastName}
Gender: ${person.gender}
Date of Birth: ${person.dob}
Height: ${person.height}
Weight: ${person.weight}
Eyecolor: ${person.eyeColor}
Occupation: ${person.occupation}`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()


/**
 * This function's purposeis twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    var letters = /^[A-Za-z]+$/;
    if(input.match(letters))
     {
      return true;
     }
    else
     {
     alert("Invalid input, please use letters only.");
     return false;
     }
  }

// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

//Traits validation
function traitVal(input){
    var letters = /^[A-Za-z0-9" ":/]+$/;
    var category = ["firstName","lastName","gender","dob","height","weight","eyeColor","occupation"]
    if(input.match(letters) && category.some(cat => input.includes(cat)))
     {
      return true;
     }
    else
     {
     alert("Invalid input, please use A-z, 0-9, ':' and at least one category name.");
     return false;
     }
  }

  function findPersonFamily(person, people){
    let family = `${person.firstName} ${person.lastName}'s family members are:`
    family += findPersonSpouse(person, people);
    family += findPersonSiblings(person, people);
    family += findPersonParents(person, people);
    return family;
}
function listNames(people, relationship){
    let nameList = people.map(function(el){
        return `\n${el.firstName} ${el.lastName}`;
    })
    if(people.length > 0){
        return `\n${relationship}${nameList}\n`;      
    }
    else{
        return `\nNo ${relationship} in the system.\n`;
    }

}
function findPersonSpouse(person, people){
    let spouse = people.filter(function(el){
        if(person.currentSpouse == el.id){
            return true;
        }
        else{
            return false;
        } 
    })
    let spouseList = listNames(spouse, 'Spouse:');
    return spouseList;
}
function findPersonParents(person, people){
    let parents = people.filter(function(el){
        if(person.parents.includes(el.id)){
                return true;
            }
            else{
                return false;
            }   
        })      
    let parentList = listNames(parents, 'Parents:');
    return parentList;
}
function findPersonSiblings(person, people){
    let siblings = people.filter(function(el){
        if((person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])) && person.id != el.id){
            return true;
        }
        else{
            return false;
        }
    })
    let personSiblings = listNames(siblings, 'Siblings:');
    return personSiblings;
}
function findPersonChildren(person, people, descendants = []){   
    let children = people.filter(function(el){
        if(el.parents.includes(person.id)){
            return true;
        }
        else{
            return false;
        }
    })
    if(children.length == 0){
        return descendants;
    }
    else{
        let newDescendants = [];
        for(let i = 0; i < children.length; i++){
            if(descendants.includes(children[i]) == false){
                descendants.push(children[i]);
                newDescendants.push(children[i]);
            }
        }
        for(let i = 0; i < newDescendants.length; i++){
            let newChildren = findPersonChildren(newDescendants[i], people, descendants);
            if(newChildren != descendants){
                descendants = newChildren;
            }
            if(i == (newDescendants.length - 1)){
                return descendants;
            }
        }  
    }
}
function findPersonDescendants(person, people){
    let descendants = findPersonChildren(person, people);
    let listedDescendants = listNames(descendants, "Descendants:");
    return listedDescendants;      
}

function searchByTraits(people){
    let displayOption = promptFor(
        `You can search for people by their traits.\nEnter a trait:\ngender\nheight\nweight\noccupation\n"dob" for date of birth\neyeColor\nex: gender female (single trait search)\nweight 180:eyeColor blue (multiple traits[up to 6])`, traitVal);
    let formattedInput = splitInput(displayOption);
    let results = searchByMany(formattedInput, people);
    let searchResults = listNames(results, "Search Results");
    return searchResults;
}

function splitInput(string){
    let args = string.split(':');
    let args2 = args.map(function(el){
        return el.split(' ');
    })
    return args2;
}

function searchFor(category){
    let input = promptFor(`Enter a ${category}`, chars);
    
    return input;
}

function searchBy(category, argument, people){
    let results = people.filter(function(el){
        if(el[category] == argument){
            return true;
        }
        else{
            return false;
        }
    })
    return results;
}

function searchByMany(list, people){
    let results = people.filter(function(el){
        for(let i=0; i < list.length; i++){
            let category = list[i][0];
            let argument = list[i][1];
            if(el[category] == argument && i == (list.length-1)){
                return true;
            }
            else if(el[list[i][0]] == list[i][1]){
                continue;
            }
            else{
                return false;
            }
        }
    })
    return results;
}
