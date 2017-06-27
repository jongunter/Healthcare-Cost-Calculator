
let plan;
beforeEach(()=>{
        plan = new HealthcarePlan(100, 100, 0.7, 200);
})

describe('under deductible', function() {

    it('returns the premium x 12 when no expenses billed to plan', ()=> {
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(0);
        expect(yearlyCosts).toBe(1200);
    });

    it('returns yearly premium + expenses', ()=> {
        const YEARLY_PREMIUM = 1200;
        const EXPENSES = 50;
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(EXPENSES);
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + EXPENSES);
    })

});

describe('under OOPM but over deductible', ()=> {

    it('returns the right number', ()=> {
        const YEARLY_PREMIUM = 1200;
        const EXPENSES = 150;
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(150);
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + 100 /* Deductible */ + 15 /* 30% co-pay  */)
    })

})

describe('over OOPM', ()=> {

    it('returns the right number', ()=> {
        const YEARLY_PREMIUM = 1200;
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(1000);
        expect(yearlyCosts).toBe(200 + 1200);
    })

})

describe('a premium plan with no co-pays', ()=> {

    const YEARLY_PREMIUM = 1200;
    const DEDUCTIBLE = 200;
    const ONE_HUNDRED_PERCENT = 1;
    beforeEach(()=> {
        plan = new HealthcarePlan(100, DEDUCTIBLE, ONE_HUNDRED_PERCENT, 7200 )
    });

    it('has a total cost of yearly premium  with $0 of expenses', ()=> {
        const yearlyCosts = plan.caculateOutOfPocketCostForYear(0);
        expect(yearlyCosts).toBe(1200);
    });

    it('has a total cost of yearly premium + $50 with $200 of expenses', ()=> {
        const yearlyCosts = plan.caculateOutOfPocketCostForYear(50);
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + 50);
    });

     it('has a total cost of yearly premium + deductible with $200 of expenses', ()=> {
        const yearlyCosts = plan.caculateOutOfPocketCostForYear(200);
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + DEDUCTIBLE);
    });

    it('has a total cost of yearly premium + deductible with $5000 of expenses', ()=> {
        const yearlyCosts = plan.caculateOutOfPocketCostForYear(5000);
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + DEDUCTIBLE);
    });

})

