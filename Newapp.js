let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-list");
const deleteBtn = document.querySelector("#delete-btn");

const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

if (leadsfromLocalStorage) {
  myLeads = leadsfromLocalStorage;
  render(myLeads);
}

function render(Leads) {
  let listItems = "";
  for (let i = 0; i < Leads.length; i++) {
    listItems += `
      <li>
        <a href="${Leads[i]}" target="_blank">
         ${Leads[i]}
        </a>
      </li>
      `;
  }
  ulEl.innerHTML = listItems;
}
