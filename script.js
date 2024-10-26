'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const hideElement = document.querySelector(`.hide`)
const loginbtn = document.querySelector(`.login__btn`)


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const container = document.querySelector(`.movements`)
const movments_account = function (currentAccount) {
    currentAccount.movements.map((mov) => {
            const color = mov > 0 ? "movements__type--deposit" : "movements__type--withdrawal"
            const html = `<div class="movements__row">
            <div class="movements__type ${color}">2 deposit</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}</div>
          </div>`
            container.insertAdjacentHTML("afterbegin", html)
        }
    )
}


const createusername = function (accounts) {

    accounts.forEach(
        (acc) => {
            acc.username = acc.owner
                .split(" ")
                .map((first) => first.slice(0, 1))
                .join("").toLocaleLowerCase()

        })

}

createusername(accounts)

// const diposits = movements.filter( (number)=> number>0)
// const withdrawal= movements.filter( (mov) => mov < 0)
// console.log(withdrawal)

// const numbers = [10,10, 10, 10, 4];
// //const balance = numbers.reduce( (acc,current)=> current > acc? current:acc,numbers[0])
// const balance =numbers.reduce( function(acc,current){
//   return acc+current
// } , 0)


// console.log(balance)
const balance_value = document.querySelector(`.balance__value`)

const calcDisplayBalance = function (currentAccount) {
      currentAccount.balance = currentAccount.movements.reduce((acc, curr) => acc + curr)
      balance_value.textContent = `${currentAccount.balance}`
           
}

///////

const summary = document.querySelector(`.summary__value--in`)
const incomeBalance = function (currentAccount) {
     const income = currentAccount.movements.filter((mov) => mov > 0).reduce((acc, curr) => acc + curr, 0)
     summary.textContent = `${income}`

}


const summary_out = document.querySelector(`.summary__value--out`)
const outBalance = function (currentAccount) {
      const out = currentAccount.movements.filter((mov) => mov < 0).reduce((acc, curr) => acc + curr, 0)
       summary_out.textContent = `${Math.abs(out)}`
}


// For each diposit , get interes 1.2

const interset_container = document.querySelector(`.summary__value--interest`)
const interest = function (currentAccount) {
      const intersets = currentAccount.movements.filter((mov) => mov > 0)
        .map((mov) => mov * 1 / 100)
        .reduce((acc, curr) => acc + curr, 0)
      
     interset_container.textContent = `${intersets}`
}

const updateUI = function(currentAccount){
  // movment account
  movments_account(currentAccount)
  calcDisplayBalance(currentAccount)
  //account income
  incomeBalance(currentAccount)
  
  //account outbalnace
  outBalance(currentAccount)

  interest(currentAccount)
    
}


let currentAccount;
loginbtn.addEventListener("click", function (e) {
    e.preventDefault()
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value)

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    hideElement.style.opacity = 100;
   
    
    updateUI(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
    e.preventDefault()
    //if balance exist and > 0 and recieved account exist
    const recievedAccount = accounts.find((acc)=> inputTransferTo.value === acc.username)
    
    const Amount =Number(inputTransferAmount.value)
    if(Amount > 0 && currentAccount.balance >= Amount && recievedAccount?.username !== currentAccount.username
     ) {
      
       currentAccount.movements.push(-Amount);
      recievedAccount.movements.push(Amount)
      console.log(recievedAccount)
      updateUI(currentAccount);
   }

});