let incomeAmount = 0;
let expenseAmount = 0;


function initTabs() {
    const links = document.querySelectorAll(".sidebar-link");
    const sections = document.querySelectorAll(".tabSection");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove("active"));

            sections.forEach(s => s.classList.remove("active"));

            link.classList.add("active");

            const target = document.getElementById(link.dataset.target);
            target.classList.add("active");
        });
    });
}

const entries = JSON.parse(localStorage.getItem("entries") || "[]");
// localStorage.removeItem("entries");
renderTable();
function entry(currentType) {

    const amount = document.getElementById("expenseAmount").value;
    const date = document.getElementById("expenseDate").value;
    const category = document.getElementById("categoryType").value;
    const merchentName = document.getElementById("expenseMerchent").value;
    const note = document.getElementById("note").value;

    entries.push(
        {
            type: currentType,
            date: date,
            amount: amount,
            category: category,
            merchentName: merchentName,
            note: note
        }
    );
    console.log(currentType);
    localStorage.setItem("entries", JSON.stringify(entries));
    console.log(JSON.parse(localStorage.getItem("entries")));


    renderTable();
    resetValues();
};

let currentType = "expense";

const button = document.querySelectorAll(".button");
button.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.id === "expenseBtn") {
            currentType = "expense";
        }
        else {
            currentType = "income";
        }
        button.forEach(btn => {
            btn.classList.remove("active");
        })
        btn.classList.add("active");
    });
});


const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
    entry(currentType);
});

function resetValues() {
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = "";
    document.getElementById("categoryType").value = "";
    document.getElementById("expenseMerchent").value = "";
    document.getElementById("note").value = "";
};

function renderTable() {
    const trxTable = document.querySelector(".trxDetail");
    entries.forEach(entry => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${entry.merchentName}</td>
            <td>${entry.category}</td>
            <td>${entry.date}</td>
            <td class = "amount">${entry.amount}</td>
        `
        trxTable.append(tr);
    }
    );
};