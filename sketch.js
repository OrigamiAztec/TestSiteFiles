function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
}

async function getData(){
			const response = await fetch('testing.csv');
			const data = await response.text();
			console.log(data);
	
			const rows = data.split('\n').slice(1, 140);
	
			rows.forEach(element => {
				const row = element.split(',');
				const year = row[0];
				xlabels.push(year);
				const meanTemp = row[1];
				meantemparray.push(parseFloat(meanTemp)*9/5 + 32);
				console.log(year, meanTemp);
			});

		}
		

async function graphData(){
	await getData();
	const ctx = document.getElementById('myChart').getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: xlabels,
				datasets: [{
					label: 'Combined Land-Surface Air and Sea-Surface Water Temperature (F)',
					data: meantemparray,
					backgroundColor: 'white',
					borderColor: 'hsla(250,19%,57%,.9)',
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value, index, values){
								return value + '°';
							},
							beginAtZero: false
						
						}
					}]
				}
			}
		});
}


