'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-powered diagnostic support, allowing doctors to get diagnosis suggestions based on patient data.
 *
 * - `getAiDiagnosisSupport` - A function that takes patient data and returns AI-driven diagnostic suggestions.
 * - `AiDiagnosisSupportInput` - The input type for the `getAiDiagnosisSupport` function.
 * - `AiDiagnosisSupportOutput` - The return type for the `getAiDiagnosisSupport` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDiagnosisSupportInputSchema = z.object({
  patientId: z.string().describe('The unique identifier of the patient.'),
  currentSymptoms: z.string().describe('Description of the patient\'s current symptoms.'),
  historicalData: z.string().describe('Summary of the patient\'s medical history.'),
  labReports: z.string().describe('The latest lab reports for the patient.'),
  doctorNotes: z.string().describe('Notes from the doctor about the patient.'),
});
export type AiDiagnosisSupportInput = z.infer<typeof AiDiagnosisSupportInputSchema>;

const AiDiagnosisSupportOutputSchema = z.object({
  diagnosisSuggestion: z.string().describe('The AI-generated diagnosis suggestion.'),
  confidenceLevel: z.number().describe('A number between 0 and 1 indicating the confidence level of the diagnosis suggestion.'),
  factorsForConcern: z.string().optional().describe('Factors that should cause more concern, based on probabilities.'),
  suggestedTreatment: z.string().optional().describe('The suggested treatment for the patient.'),
});
export type AiDiagnosisSupportOutput = z.infer<typeof AiDiagnosisSupportOutputSchema>;

export async function getAiDiagnosisSupport(input: AiDiagnosisSupportInput): Promise<AiDiagnosisSupportOutput> {
  return aiDiagnosisSupportFlow(input);
}

const aiDiagnosisSupportPrompt = ai.definePrompt({
  name: 'aiDiagnosisSupportPrompt',
  input: {schema: AiDiagnosisSupportInputSchema},
  output: {schema: AiDiagnosisSupportOutputSchema},
  prompt: `You are an AI assistant helping doctors diagnose patients.

  Based on the patient's historical data, current symptoms, lab reports, and doctor\'s notes, provide a diagnosis suggestion.
  Also, provide a confidence level (0-1) for your suggestion. If the information contains factors that should cause more concern, describe those factors. Finally, give a suggested treatment for the patient.

  Patient ID: {{{patientId}}}
  Current Symptoms: {{{currentSymptoms}}}
  Historical Data: {{{historicalData}}}
  Lab Reports: {{{labReports}}}
  Doctor\'s Notes: {{{doctorNotes}}}`,
});

const aiDiagnosisSupportFlow = ai.defineFlow(
  {
    name: 'aiDiagnosisSupportFlow',
    inputSchema: AiDiagnosisSupportInputSchema,
    outputSchema: AiDiagnosisSupportOutputSchema,
  },
  async input => {
    const {output} = await aiDiagnosisSupportPrompt(input);
    return output!;
  }
);
