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
		
getData();


