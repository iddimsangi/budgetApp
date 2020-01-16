var budgetController = (function(){

})();

var UIcontroller = (function(){

})();

var controller = (function(budgetCtrl,uiCtrl){
    var ctrlAdd = function(){
console.log('you have clicked the button');
//TO DO LIST AFTER THE BUTTON CLICKED...
//.1 Get input field data



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