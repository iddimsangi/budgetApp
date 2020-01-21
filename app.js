var budgetController = (function(){
    var Expenses = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Incomes = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data ={
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };
    return{
        
        addItem:function(type, des, val){
            var newItem,ID;
        if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }else{
            ID = 0;
        }
           
            if(type === 'exp'){
                newItem = new Expenses(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Incomes(ID, des, val);
            }
             data.allItems[type].push(newItem);
            // data.allItems.exp/inc.push(newItem);
           return newItem;
        },
        testing:function(){
            console.log(data);
        }
    }

})();



var UIcontroller = (function(){
//create a private object for DOM Strings
var domStrings = {
        typeStrng:'.add__type',
        descriptionStrng:'.add__description',
        valueStrng:'.add__value',
        inputBtnStrng:'.add__btn',
        expContainer:'.expenses__list',
        incContainer:'.income__list'
};

//create a public method for share input field values
    return{
        getInputFields:function(){
            return{
                type: document.querySelector(domStrings.typeStrng).value,
                description: document.querySelector(domStrings.descriptionStrng).value,
                value: document.querySelector(domStrings.valueStrng).value
            };
        },
            //method for retreive the data from DOM
            addList:function(obj, type){
            var html, newHtml, element;
            //create HTML Strings with placeholders text
            if(type === 'exp'){
                element = domStrings.expContainer;
 html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'inc'){
                element = domStrings.incContainer;
 html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace the place holders text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
 
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
 
        },
      
        getDOMstring: function(){
            return domStrings;
       }
    }

})();


var controller = (function(budgetCtrl, uiCtrl){
  //structure and organize the codes
  var setEventListeners = function(){
    var myDOM = uiCtrl.getDOMstring();
    document.querySelector(myDOM.inputBtnStrng).addEventListener('click',ctrlAdd);

   document.addEventListener('keypress',function(event){
   if(event.keyCode === 13 || event.which === 13){
 ctrlAdd();
    }
})
};
  
    
var ctrlAdd = function(){
// console.log('you have clicked the button');
//TO DO LIST AFTER THE BUTTON CLICKED...
//.1 Get input field data
var input = uiCtrl.getInputFields();
// console.log(inputs);

//.2 Add the item to the budget controller
var newItemAded = budgetCtrl.addItem(input.type, input.description, input.value);


//.3 Add the item to the UI
uiCtrl.addList(newItemAded, input.type);


//.4 Calculate the budget



//.5 Display the budget on UI
 };
return{
    init:function(){
        console.log('app starts......');
        setEventListeners();
    }
};


})(budgetController, UIcontroller);
controller.init();//the app starts here