import { describe, it, beforeEach, expect } from "vitest"

describe("Galactic Seed Placement Contract", () => {
  let mockStorage: Map<string, any>
  let nextId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "place-seed":
        const [location, potential] = args
        const id = nextId++
        mockStorage.set(id, { location, potential })
        return { success: true, value: id }
      case "get-seed":
        return { success: true, value: mockStorage.get(args[0]) }
      case "get-total-seeds":
        return { success: true, value: nextId }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should place a galactic seed", () => {
    const result = mockContractCall("place-seed", ["Alpha Centauri", 80])
    expect(result.success).toBe(true)
    expect(result.value).toBe(0)
  })
  
  it("should get a galactic seed", () => {
    mockContractCall("place-seed", ["Sirius", 75])
    const result = mockContractCall("get-seed", [0])
    expect(result.success).toBe(true)
    expect(result.value.location).toBe("Sirius")
    expect(result.value.potential).toBe(75)
  })
  
  it("should get total seeds", () => {
    mockContractCall("place-seed", ["Betelgeuse", 60])
    mockContractCall("place-seed", ["Vega", 70])
    const result = mockContractCall("get-total-seeds")
    expect(result.success).toBe(true)
    expect(result.value).toBe(2)
  })
})

