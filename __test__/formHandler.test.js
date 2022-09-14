import { handleSubmit, isUrlValid, standardizePolarity } from "../src/client/js/formHandler"

describe("Form Handler", () => {
    test("Should be defined", () => {
        expect(handleSubmit).toBeDefined()
    })

    test("Should check URL and return value correctly", () => {
		const url = "https://stackoverflow.com/questions/30970068/js-regex-url-validation"
		expect(isUrlValid(url)).toBe(true)
	})

    test("Should return the correct polarity", () => {
		const scoreTag = "P"
		expect(standardizePolarity(scoreTag)).toBe('POSITIVE')
	})
})