"use server";

import {
  getAiDiagnosisSupport,
  type AiDiagnosisSupportInput,
  type AiDiagnosisSupportOutput,
} from "@/ai/flows/ai-diagnostic-support";

export async function runAiDiagnosis(
  input: AiDiagnosisSupportInput
): Promise<AiDiagnosisSupportOutput> {
  try {
    const output = await getAiDiagnosisSupport(input);
    return output;
  } catch (error) {
    console.error("Error in AI Diagnosis Flow:", error);
    throw new Error("Failed to get AI diagnosis.");
  }
}
