var chart;

function drawChart(winData) {
	var ctx = document.getElementById('chart').getContext('2d');
	var labels = [];
	for (l = 0; l < numplayers; l++){
		labels.push("Player "+parseInt(parseInt(l)+parseInt(1)));
	}
	labels[0] += " (Starter/Dealer)"
	labels[numplayers - 1] += " (Garbage)"
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [{
				label: 'Number of Four-Of-A-Kinds',
				data: winData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(150, 15, 150, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 150, 150, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(255, 255, 255, 0.2)',
					'rgba(50, 100, 150, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(150, 15, 150, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 150, 150, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255, 255, 255, 1)',
					'rgba(50, 100, 150, 1)',
				],
				borderWidth: 1
			}]
		},
		options: {
			responsive: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});

	chart = myChart;
}
