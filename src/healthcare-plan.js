const MONTHS_IN_YEAR = 12;
const ONE_HUNDRED_PERCENT = 1;


class HealthcarePlan {

    constructor(premium, deductible, percentPaid, outOfPocketMax){

        assertNumber(premium);
        assertNumber(deductible);
        assertPercent(percentPaid);
        assertNumber(outOfPocketMax);

        this.premium = premium;
        this.deductible = deductible;
        this.percentPaid = percentPaid;
        this.outOfPocketMax = outOfPocketMax;

    }

    caculateOutOfPocketCostForYear(totalYearBillAmount){

        let total = this.yearlyPremiumCost;

        if(this.deductibleNotExceeded(totalYearBillAmount)){
            total += totalYearBillAmount
        } else {
            let amountLeftToBill = totalYearBillAmount;

            // subtract deductible segment
            total += this.deductible;
            amountLeftToBill -= this.deductible;

            // co-payment segment
            let coInsurance = this.percentPaid * amountLeftToBill;
            let coPay = amountLeftToBill - coInsurance;
            
            if(this.deductible + coPay >= this.outOfPocketMax){
                total = this.outOfPocketMax + this.yearlyPremiumCost;
            } else {
                total += coPay;
            }

        }

        return total;

    }

    deductibleNotExceeded(totalYearBillAmount){
        return totalYearBillAmount <= this.deductible;
    }

    get yearlyMaxCost(){
        return this.yearlyPremiumCost + this.outOfPocketMax;
    }

    get yearlyPremiumCost(){
        return this.premium * MONTHS_IN_YEAR;
    }

    get coPayPercent(){
        return ONE_HUNDRED_PERCENT - this.percentPaid

    }

}

function assertNumber(number){
    if(isNaN(number)){
        throw new Error('not a number');
    }
    if(number < 0){
        throw new Error('cost cannot be less than zero');
    }
}

function assertPercent(percent){
    assertNumber(percent);
    if(percent > 1){
        throw new Error('You cannot have % > 1');
    }
}