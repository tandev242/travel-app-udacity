import { handleSubmit, fillTravelPlans } from "../src/client/js/formHandler"

describe("Form Handler", () => {
    test("Should handleSubmit be defined", () => {
        expect(handleSubmit).toBeDefined()
    })

	test("Should fillTravelPlans be defined", () => {
        expect(fillTravelPlans).toBeDefined()
    })
})