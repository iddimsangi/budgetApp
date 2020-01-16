var budgetController = (function(){

})();

var UIcontroller = (function(){
//create a public method for share input field values
    return{
        getInputFields:function(){
            return{
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                inputValue: document.querySelector('.add__value').value
            }
        }
    }


})();

var controller = (function(budgetCtrl,uiCtrl){
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
document.querySelector('.add__btn').addEventListener('click',ctrlAdd);

document.addEventListener('keypress',function(event){
    if(event.keyCode === 13 || event.which === 13){
      ctrlAdd();
    }
})



})(budgetController,UIcontroller);