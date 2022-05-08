import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

//spies = espiões
const createFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe("Submit Feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64 djsadaslkdasjldksadlksa",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendEmailSpy).toHaveBeenCalled()
  });

  it("should not be able to send a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64 djsadaslkdasjldksadlksa",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "IDEA",
        comment: "",
        screenshot: "data:image/png;base64 djsadaslkdasjldksadlksa",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send a invalid screenshot format", async () => {
    await expect(
      submitFeedback.execute({
        type: "IDEA",
        comment: "que tal fazer...",
        screenshot: "text.jpg",
      })
    ).rejects.toThrow();
  });
});
