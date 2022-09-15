import { addTravelPlan, deleteTravelPlan } from "../src/client/js/api"

describe("APIs", () => {
    test("Should addTravelPlan be defined", () => {
        expect(addTravelPlan).toBeDefined()
    })
    test("Should deleteTravelPlan be defined", () => {
        expect(deleteTravelPlan).toBeDefined()
    })
})