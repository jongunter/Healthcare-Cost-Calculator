const BILLED_AMOUNTS = [0, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 15000, 20000, 30000];
const CHART_CONTAINER = document.getElementById('chart');
const LOCAL_STORAGE_KEY = 'plans';
const BILLED_AMOUNTS_DOLLARS = BILLED_AMOUNTS.map(a => '$' + String(a));

const DEFAULT_PLANS = [
  {
    planName: 'Sample Plan',
    monthlyPremium: 350,
    deductible: 3000,
    coinsurance: 0.7,
    outOfPocketMax: 7200
  }
];


function getPlansFromStorage(){
    var plansFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(!plansFromStorage){
        return DEFAULT_PLANS;
    } else {
        return JSON.parse(plansFromStorage);
    }

}

function savePlansToStorage(plans){
    const jsonString = JSON.stringify(plans);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonString);
}


var data = getPlansFromStorage();

var container = document.getElementById('worksheet');
var hot = new Handsontable(container, {
  data: data,
  rowHeaders: true,
  colHeaders: ['Plan', 'Montly Premium', 'Deductible', 'Coinsurance', 'Out-of-pocket Max'],
  afterChange: function(){
    var plans = getCostChartData(data);
    savePlansToStorage(data);
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

function drawChart(plans){

    var datasets = plans.map(planInfo => {
            return {
                label: planInfo.name,
                data: planInfo.costs,
                borderWidth: 1,
                fill: false,
                borderColor: randomColor()
            }
    });


    var myLineChart = new Chart(CHART_CONTAINER, {
        type: 'line',
        data: {
            labels: BILLED_AMOUNTS_DOLLARS,
            datasets: datasets
        }
    });
}


function getCostChartData(plans){

    return plans
        .filter(assertValidPlan)
        .map(function(plan){
            var hcp = new HealthcarePlan(plan.monthlyPremium, plan.deductible, plan.coinsurance, plan.outOfPocketMax);
            var planInfo = {
                name: plan.planName,
                costs: BILLED_AMOUNTS.map(amount => hcp.caculateOutOfPocketCostForYear(amount))
            }
            return planInfo;
        });

}

function assertValidPlan(plan){
    return Boolean(plan.planName) && !isNaN(plan.monthlyPremium) && !isNaN(plan.deductible) && !isNaN(plan.coinsurance) && !isNaN(plan.outOfPocketMax)
}