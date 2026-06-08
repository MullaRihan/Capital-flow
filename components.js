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


document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadSidebar(),
        loadHeader()
    ]);

    initTabs();
    renderTable();
    calculateAmount();
});

