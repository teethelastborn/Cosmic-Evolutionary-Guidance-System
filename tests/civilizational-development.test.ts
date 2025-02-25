import { describe, it, beforeEach, expect } from "vitest"

describe("Civilizational Development Pathway Contract", () => {
  let mockStorage: Map<string, any>
  let nextId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "register-civilization":
        const [name] = args
        const id = nextId++
        mockStorage.set(id, { name, development_stage: 1, technology_level: 1 })
        return { success: true, value: id }
      case "advance-civilization":
        const [civId] = args
        const civ = mockStorage.get(civId)
        if (!civ) return { success: false, error: 404 }
        civ.development_stage++
        civ.technology_level++
        return { success: true }
      case "get-civilization":
        return { success: true, value: mockStorage.get(args[0]) }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should register a civilization", () => {
    const result = mockContractCall("register-civilization", ["Zorgons"])
    expect(result.success).toBe(true)
    expect(result.value).toBe(0)
  })
  
  it("should advance a civilization", () => {
    mockContractCall("register-civilization", ["Blorgons"])
    const result = mockContractCall("advance-civilization", [0])
    expect(result.success).toBe(true)
  })
  
  it("should get a civilization", () => {
    mockContractCall("register-civilization", ["Glorpians"])
    mockContractCall("advance-civilization", [0])
    const result = mockContractCall("get-civilization", [0])
    expect(result.success).toBe(true)
    expect(result.value.name).toBe("Glorpians")
    expect(result.value.development_stage).toBe(2)
    expect(result.value.technology_level).toBe(2)
  })
})

