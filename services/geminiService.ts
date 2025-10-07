
import { GoogleGenAI } from '@google/genai';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set. Video generation will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateVideo = async (prompt: string, imageBase64: string | null, mimeType: string | null): Promise<string> => {
    try {
        const generationPayload: any = {
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: {
                numberOfVideos: 1
            }
        };

        if (imageBase64 && mimeType) {
            generationPayload.image = {
                imageBytes: imageBase64,
                mimeType: mimeType,
            };
        }

        let operation = await ai.models.generateVideos(generationPayload);

        while (!operation.done) {
            // Wait for 10 seconds before polling again
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }
        
        console.log("Video generation operation finished:", JSON.stringify(operation, null, 2));

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found. This can happen if the content is flagged by safety filters. Please try a different prompt or image.");
        }

        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download the generated video. Status: ${videoResponse.status}`);
        }

        const videoBlob = await videoResponse.blob();
        return URL.createObjectURL(videoBlob);

    } catch (error) {
        console.error("Error generating video with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate video: ${error.message}`);
        }
        throw new Error("An unknown error occurred during video generation.");
    }
};
