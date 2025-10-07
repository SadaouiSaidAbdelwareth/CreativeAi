
export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        // The result includes the data URL prefix (e.g., "data:image/jpeg;base64,"),
        // we need to remove it for the Gemini API.
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        resolve(reader.result);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
};
