async function loadComponents(selector, url) {
    try {

        const selectorContainer = document.querySelector(selector);

        const response = await fetch(url);
        const data = await response.text();

        selectorContainer.innerHTML = data;
    }
    catch (error) {
        console.error("There is error");
    }

};

function loadSidebar() {
    return loadComponents("#sidebar", "sidebar.html");
};

function loadHeader() {
    return loadComponents("#mainHeader", "header.html");
};


// In components.js
document.addEventListener("DOMContentLoaded", async () => {
    document.body.classList.add("loading");
    
    await Promise.all([
        loadSidebar(),
        loadHeader()
    ]);

    document.body.classList.remove("loading");
    
    initTabs();
    renderTable();
    calculateAmount();
});
