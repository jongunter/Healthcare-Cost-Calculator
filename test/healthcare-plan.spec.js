
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
        expect(yearlyCosts).toBe(YEARLY_PREMIUM + 100 + 35)
    })

})

describe('over OOPM', ()=> {

    it('returns the right number', ()=> {
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(1000);
        expect(yearlyCosts).toBe(200);
    })

})

