var budgetController = (function(){

})();

var UIcontroller = (function(){
//create a private object for DOM Strings
var domStrings = {
        typeStrng:'.add__type',
        descriptionStrng:'.add__description',
        inputValueStrng:'.add__value',
        inputBtnStrng:'.add__btn'
};

//create a public method for share input field values
    return{
        getInputFields:function(){
            return{
                type: document.querySelector(domStrings.typeStrng).value,
                description: document.querySelector(domStrings.descriptionStrng).value,
                inputValue: document.querySelector(domStrings.inputValueStrng).value
            }
        },
        //method that will make a private object to be public to the other controller
       getDOMstring: function(){
            return domStrings;
       } 
    }

})();

var controller = (function(budgetCtrl,uiCtrl){
    var myDOM = uiCtrl.getDOMstring();
    var ctrlAdd = function(){
// console.log('you have clicked the button');
//TO DO LIST AFTER THE BUTTON CLICKED...
//.1 Get input field data
var inputs = uiCtrl.getInputFields();
console.log(inputs);

//.2 Add the item to the budget controller



//.3 Add the item to the UI



//.4 Calculate the budget



//.5 Display the budget on UI
    }
document.querySelector(myDOM.inputBtnStrng).addEventListener('click',ctrlAdd);

document.addEventListener('keypress',function(event){
    if(event.keyCode === 13 || event.which === 13){
      ctrlAdd();
    }
})



})(budgetController,UIcontroller);