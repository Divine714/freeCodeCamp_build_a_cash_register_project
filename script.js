const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

let keyArr = [
  ["PENNY", .01],
  ["NICKEL", .05],
  ["DIME", .1],
  ["QUARTER", .25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];


const calcChange = (custCash) => {
  const cashPaid = parseFloat(custCash);
  let changeReq = (cashPaid - price).toFixed(2);
  let changePaid = [];
  console.log(changeReq)
  if (price > cashPaid) {
    alert("Customer does not have enough money to purchase the item");
    return;
  };
  
  if (price === cashPaid) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return; 
  } 

  for (let i = 0; i < keyArr.length; i++) {
    let keyArrRev = keyArr.slice().reverse();
    let name = keyArrRev[i][0];
    let money = cid.slice().reverse()[i][1].toFixed(2);
    let unitKey = keyArrRev[i][1];
    const format = (array) => array.map(([x,y]) => `${x}: $${y}`).join(" ");
    if (unitKey <= changeReq && money >= 0) {
      let changeGiven = 0;

      while (changeReq >= unitKey && money > 0) {
        changeReq = (changeReq - unitKey).toFixed(2);
        money -= unitKey;
        changeGiven += unitKey;
        } 

      if (changeGiven > 0) {
        changePaid.push([name, changeGiven.toFixed(2)]);
        }
      if (money < changeReq  && changeReq > 0){
        changeDue.innerText = `Status: INSUFFICIENT_FUNDS`;
       } else if (money > changeReq) {
        changeDue.innerText = `Status: OPEN ${format(changePaid)}`
       } else if (money === 0) {
         changeDue.innerText = `Status: CLOSED ${format(changePaid)}`
       } else {
        changeDue.innerText = `Status: CLOSED ${format(changePaid)}`      
      }
      }
    };

};


purchaseBtn.addEventListener("click", () => {
  calcChange(cash.value);
  cash.value = "";
});  

    
  
  
