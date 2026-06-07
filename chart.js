const ctx = document.getElementById("monthlyChart").getContext("2d");

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 320);

gradient.addColorStop(0, "rgba(15,23,42,0.35)");
gradient.addColorStop(1, "rgba(15,23,42,0)");

new Chart(ctx, {
    type: "line",

    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [{
            label: "Monthly Spending",
            data: [1200, 1800, 1500, 2400, 2100, 2800],

            borderColor: "#0f172a",
            backgroundColor: gradient,

            fill: true,

            tension: 0.4,

            pointRadius: 5,
            pointHoverRadius: 7,

            pointBackgroundColor: "#0f172a",
            pointBorderColor: "#fff",
            pointBorderWidth: 2
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                backgroundColor: "#0f172a",
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },
                border: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                grid: {
                    color: "#e2e8f0"
                },

                border: {
                    display: false
                },

                ticks: {
                    callback: function (value) {
                        return "$" + value;
                    }
                }
            }
        }
    }
});

const categoryCtx = document.getElementById('categoryChart');

new Chart(categoryCtx, {
    type: 'pie',

    data: {
        labels: [
            'Food',
            'Transport',
            'Shopping',
            'Bills',
            'Entertainment'
        ],

        datasets: [{
            data: [
                450,
                200,
                300,
                600,
                150
            ],

            backgroundColor: [
                '#3b82f6',
                '#10b981',
                '#f59e0b',
                '#ef4444',
                '#8b5cf6'
            ],

            borderWidth: 2,
            borderColor: '#ffffff'
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                position: 'bottom'
            },

            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ₹${context.raw}`;
                    }
                }
            }
        }
    }
});