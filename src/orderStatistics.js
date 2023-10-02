

export function initChart(orderCount,monthlySales) {
    const ctx = document.getElementById('myChart').getContext('2d');
    // Crea un oggetto di dati per il grafico
    const data = {
      labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
      datasets: [{
        label: 'ammontare degli ordini',
        grouped:true,
        backgroundColor: 'rgba(255, 242, 176, 0.5)',
        borderColor: 'rgba(255, 242, 176, 1)',
        borderWidth: 1,
        data: orderCount
      },
      {
        label: 'ammontare delle entrate',
        grouped:true,
        backgroundColor: 'rgba(255, 150, 84, 0.5)',
        borderColor: 'rgba(255, 160, 84, 1)',
        borderWidth: 1,
        data: monthlySales
      }
    ]
    };
  
    // Configura le opzioni del grafico
    var options = {
      responsive: true,
      maintainAspectRatio: true
    };
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });
  }
 