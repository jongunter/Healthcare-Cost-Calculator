
let plan;
beforeEach(()=>{
        plan = new HealthcarePlan(100, 5000, 0.8, 7100);
})

describe('under deductible', function() {

    it('returns the premium x 12 when no expenses billed to plan', ()=> {
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(0);
        expect(yearlyCosts).toBe(1200);
    });

    it('returns yearly premium + expenses', ()=> {
        let yearlyCosts = plan.caculateOutOfPocketCostForYear(4000);
        expect(yearlyCosts).toBe(1200 + 4000);
    })

});

describe('under OOPM but over deductible', ()=> {

    it('returns the right number', ()=> {

        let yearlyCosts = plan.caculateOutOfPocketCostForYear(6000);
        expect(yearlyCosts).toBe(1200 + 5000 + 200)

    })

})

