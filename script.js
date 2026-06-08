let incomeAmount = 0;
let expenseAmount = 0;
let totalBalance = 0;
let remainingBalance = 0;

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

let entries = JSON.parse(localStorage.getItem("entries") || "[]");

function entry(currentType) {

    const amount = document.getElementById("expenseAmount").value;
    const date = document.getElementById("expenseDate").value;
    const category = document.getElementById("categoryType").value;
    const merchentName = document.getElementById("expenseMerchent").value;
    const note = document.getElementById("note").value;

    if (amount === "" || date === "" || category === "" || merchentName === "") {
        alert("Please fill all required fields");
        return
    }

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
    
    console.log("function runned"); 
    localStorage.setItem("entries", JSON.stringify(entries));

    renderTable();
    resetValues();
    calculateAmount();
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
    const trxTable2 = document.querySelector("#trxTableData");
    trxTable2.innerHTML = "";
    trxTable.innerHTML = "";
    entries.forEach(entry => {
        const tr = document.createElement("tr");
        const tr2 = document.createElement("tr");
        let tempAmount = 0;

        if (entry.type === "expense") {
            tempAmount = "-" + entry.amount;
        }
        else {
            tempAmount = "+" + entry.amount;
        }

        let tempClass = entry.type == "expense" ? "expense-amount" : "income-amount";

        tr.innerHTML = `
            <td>${entry.merchentName}</td>
            <td>${entry.category}</td>
            <td>${entry.date}</td>
            <td class = "amount ${tempClass}">${tempAmount}</td>
        `;

        tr2.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.note}</td>
        <td><span class = "category">${entry.category}</span></td>
        <td class = "amount ${tempClass}" >${tempAmount}</td>
        `

        trxTable.append(tr);
        trxTable2.append(tr2);
    }
    );

    
}

function calculateAmount() {
    expenseAmount = 0;
    incomeAmount = 0;
    entries.forEach(entry => {
        if (entry.type === "expense") {

            expenseAmount += Number(entry.amount);
        }
        else {

            incomeAmount += Number(entry.amount);
        }
    })

    remainingBalance = 0;
    totalBalance = 0;
    remainingBalance = incomeAmount - expenseAmount;
    totalBalance = incomeAmount;

    document.getElementById("monthlySpend").innerText = "₹" + expenseAmount;
    document.getElementById("budgetRemaining").innerText = "₹" + remainingBalance;
    document.getElementById("totalBalance").innerText = "₹" + totalBalance;

}

