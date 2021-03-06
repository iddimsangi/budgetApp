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
var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(cur){
        sum += cur.value; 
    });
    data.totals[type] = sum;
}
    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        perc:-1
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
        calculateBudget:function(){
            //1. calculate total incomes and expenses
            calculateTotal('inc');
            calculateTotal('exp');
            //2. calculate budget income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            //3. calcate the percentage of the income

            data.perc = Math.round((data.totals.exp / data.totals.inc)*100);
           
        },
        getBudgets:function(){
            return{
                budgetIncome: data.totals.inc,
                budgetExpenses: data.totals.exp,
                budgetTotal: data.budget,
                budgetPerc: data.perc
            }
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
        incContainer:'.income__list',
        budgetLebel: '.budget__value',
        incLabel:'.budget__income--value',
        incPercLabel:'.budget__income--percentage',
        expLabel:'.budget__expenses--value',
        expPercLabel:'.budget__expenses--percentage'
};

//create a public method for share input field values
    return{
        getInputFields:function(){
            return{
                type: document.querySelector(domStrings.typeStrng).value,
                description: document.querySelector(domStrings.descriptionStrng).value,
                value: parseFloat(document.querySelector(domStrings.valueStrng).value) 
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
        clearFields:function(){
          var fields, fieldArr;
          fields = document.querySelectorAll(domStrings.descriptionStrng +', '+domStrings.valueStrng);
          fieldArr = Array.prototype.slice.call(fields);

          fieldArr.forEach(function(curr, index, array){
           curr.value = "";
           fieldArr[0].focus();
          });

  
        },
        getBudgetUi:function(obj){
           document.querySelector(domStrings.incLabel).textContent = obj.budgetIncome;
           document.querySelector(domStrings.expLabel).textContent = obj.budgetExpenses;
           document.querySelector(domStrings.budgetLebel).textContent = obj.budgetTotal;
           if(obj.budgetIncome > 0){
            document.querySelector(domStrings.expPercLabel).textContent = obj.budgetPerc + '%';
           }else {
            document.querySelector(domStrings.expPercLabel).textContent = '---';
           }
           
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

var updateBudget = function(){
//.1 Calculate the budget
budgetCtrl.calculateBudget();
//.2 Return the budget
var budget = budgetCtrl.getBudgets();

//.3 Display the budget on UI
uiCtrl.getBudgetUi(budget);

};
    
var ctrlAdd = function(){
// console.log('you have clicked the button');
//TO DO LIST AFTER THE BUTTON CLICKED...

//.1 Get input field data
var input = uiCtrl.getInputFields();
// console.log(inputs);
if(input.description !== "" && !isNaN(input.value) && input.value > 0){
    //.2 Add the item to the budget controller
var newItemAded = budgetCtrl.addItem(input.type, input.description, input.value);


//.3 Add the item to the UI
uiCtrl.addList(newItemAded, input.type);

//.4A Clearfields and put the focus to description
uiCtrl.clearFields();
//5.update the budget
updateBudget();

}


 };


return{
    init:function(){
        console.log('app starts......');
        uiCtrl.getBudgetUi(
            {
                budgetIncome:0,
                budgetExpenses:0,
                budgetTotal:0,
                budgetPerc:0
            }
        );
        setEventListeners();
    }
};


})(budgetController, UIcontroller);
controller.init();//the app starts here