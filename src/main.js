const BILLED_AMOUNTS = [0, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000, 30000, 40000, 50000, 100000, 500000, 1000000];
const CHART_CONTAINER = document.getElementById('chart');


var data = [
  {
    planName: 'Sample Plan',
    monthlyPremium: 350,
    deductible: 3000,
    coinsurance: 0.7,
    outOfPocketMax: 7200
  }
];

var container = document.getElementById('worksheet');
var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: ['Plan', 'Montly Premium', 'Deductible', 'Coinsurance', 'Out-of-pocket Max'],
  afterChange: function(){
    var plans = getCostChartData(data);
    drawChart(plans)
  },
  minSpareRows: 5,
  columns: [
      {
        data: 'planName',
    },
    {
        data: 'monthlyPremium',
        type: 'numeric',
        format: '$0,0'
    },
    {
        data: 'deductible',
         type: 'numeric',
        format: '$0,0'
    },
    {
        data: 'coinsurance',
         type: 'numeric',
        format: '0%'
    },
    {
        data: 'outOfPocketMax',
         type: 'numeric',
        format: '$0,0'
    }

  ]
});

function drawChart(data){
    var myLineChart = new Chart(CHART_CONTAINER, {
        type: 'line',
        data: data,
        options: {

        }
        
    });
}


function getCostChartData(plans){

    return plans.map(function(plan){
        var planInfo = {
            name: plan.planName
        }
        var hcp = new HealthcarePlan(plan.monthlyPremium, plan.deductible, plan.coinsurance, plan.outOfPocketMax);
        BILLED_AMOUNTS.forEach(function(amount){
            planInfo['$' + amount] = hcp.caculateOutOfPocketCostForYear(amount);
        })

        return planInfo;
    });

}