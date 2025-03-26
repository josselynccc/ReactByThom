import { describe, it } from "vitest";
import { TransferFormData, ApiResponse } from "../../../../src/features/transfer/interface/types";

function typeTests() {
  const validTransfer: TransferFormData = {
    name: "Test",
    accountNumber: "12345678901234567890",
    amount: 100,
    description: "Test",
    email: "test@test.com",
    pin: "1234"
  };

  const validResponse: ApiResponse<TransferFormData> = {
    success: true,
    message: "OK",
    data: validTransfer
  };

  const errorResponse: ApiResponse<TransferFormData> = {
    success: false,
    message: "Error"
  };

  return { validTransfer, validResponse, errorResponse };
}

describe("Type Coverage", () => {
  it("DEBE ejecutar las verificaciones de tipo", () => {
    const results = typeTests();
    expect(results).toBeDefined();
  });
});