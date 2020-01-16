var budgetController = (function(){

})();

var UIcontroller = (function(){

})();

var controller = (function(budgetCtrl,uiCtrl){
document.querySelector('.add__btn').addEventListener('click',function(){
    console.log('testing button clicking...');
})

document.addEventListener('keypress',function(event){
    console.log(event);
})
//TO DO LIST AFTER THE BUTTON CLICKED...
//.1 Get input field data



//.2 Add the item to the budget controller



//.3 Add the item to the UI



//.4 Calculate the budget



//.5 Display the budget on UI


})(budgetController,UIcontroller);