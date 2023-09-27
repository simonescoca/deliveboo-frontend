

export function initChart($orderedMonthlySales,$orderedMonthlyOrderCount) {
    const ctx = document.getElementById('myChart').getContext('2d');
    // Crea un oggetto di dati per il grafico
    const data = {
      labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
      datasets: [{
        label: 'ammontare degli ordini',
        grouped:true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [80,80,70,40,55,93,64,80,$orderedMonthlyOrderCount,23,43,28]
      },
      {
        label: 'ammontare delle entrate',
        grouped:true,
        backgroundColor: 'rgba(13, 255, 0, 1)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        data: [120,120,100,180,155,193,164,180,$orderedMonthlySales,123,143,128]
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
 