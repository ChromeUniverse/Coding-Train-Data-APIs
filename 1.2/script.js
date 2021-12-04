const ctx = document.getElementById('chart').getContext('2d');

// gets data!
async function fetchCSV() { 
  const x_years = []; 
  const y_global = [];
  const y_north = [];
  const y_south = [];

  // fetching CSV table as raw text
  const response = await fetch('/1.2/ZonAnn.Ts+dSST.csv');
  const data = await response.text();

  // parsing CSV manually by rows
  const rows = data.split('\n').slice(1);

  // looping over rows, parsing manually by columns
  rows.forEach(row => {
    values = row.split(',');

    // fetching year and temperature
    x_years.push(values[0]);

    const global_temp = values[1];
    y_global.push(parseFloat(global_temp) + 14);

    const north_temp = values[2];
    y_north.push(parseFloat(north_temp) + 14);

    const south_temp = values[3];
    y_south.push(parseFloat(south_temp) + 14);
  });

  // output X and Y data
  return { x_years, y_global, y_north, y_south };
}

async function chartIt() {
  // get data first
  const data = await fetchCSV();

  // create a chart with fresh data
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.x_years,
      datasets: [
        {
          label: 'Global',
          data: data.y_global,
          backgroundColor: 'rgba(0, 155, 0, 0.2)',
          borderColor: 'rgba(0, 155, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'Northern Hemisphere',
          data: data.y_north,
          backgroundColor: 'rgba(200, 0, 0, 0.2)',
          borderColor: 'rgba(200, 0, 0, 1)',
          borderWidth: 1
        },
        {
          label: 'Southern Hemisphere',
          data: data.y_south,
          backgroundColor: 'rgba(0, 0, 155, 0.2)',
          borderColor: 'rgba(0, 0, 155, 1)',
          borderWidth: 1
        },

      ]
    },
    options: {
      scales: {
        y: {
          ticks: {            
            callback: function (value, index, values) {
              return value + '°';
            }
          }
        }
      }
    }
  });
}

// chart it!
chartIt();