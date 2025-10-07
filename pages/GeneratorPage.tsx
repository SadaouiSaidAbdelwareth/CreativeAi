
import React, { useState, useEffect, useRef } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { generateVideo } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { blobToBase64 } from '../utils/file';
import Section from '../components/Section';

const loadingMessages = [
    'Warming up the AI director...',
    'Scouting for the perfect virtual location...',
    'Adjusting the lighting... one photon at a time.',
    'Casting digital actors for your product...',
    'Action! The AI is now shooting the scenes.',
    'Editing the footage, adding special effects...',
    'Rendering the final masterpiece...',
    'Just a few more moments...',
];

const GeneratorPage: React.FC = () => {
  const { t } = useLocalization();
  const [image, setImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);

  const loadingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      let messageIndex = 0;
      setLoadingMessage(loadingMessages[messageIndex]);
      loadingIntervalRef.current = window.setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 4000);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    }

    return () => {
        if(loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    }
  }, [isLoading]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      const base64 = await blobToBase64(file);
      setImageBase64(base64 as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError(t('generator_page.error.prompt_required'));
      return;
    }
    if (!process.env.API_KEY) {
        setError("API_KEY environment variable not set.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);

    try {
      const videoBlobUrl = await generateVideo(prompt, imageBase64, image ? image.type : null);
      setGeneratedVideoUrl(videoBlobUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <Section className="bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t('generator_page.title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
            {t('generator_page.subtitle')}
          </p>
        </div>
      </Section>
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form Side */}
            <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{t('generator_page.generator.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('generator_page.generator.upload_label')}
                  </label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                          <img src={imagePreview} alt="Product Preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
                      ) : (
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                      )}
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label htmlFor="image-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                          <span>{t('generator_page.generator.upload_link')}</span>
                          <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                        </label>
                        <p className="pl-1 rtl:pr-1">{t('generator_page.generator.upload_drag')}</p>
                      </div>
                      <p className="text-xs text-gray-500">{t('generator_page.generator.upload_size')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('generator_page.generator.prompt_label')}
                  </label>
                  <textarea
                    id="prompt"
                    rows={5}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder={t('generator_page.generator.prompt_placeholder')}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>

                <div>
                  <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isLoading ? t('generator_page.generator.button_loading') : t('generator_page.generator.button_generate')}
                  </button>
                  <p className="text-center text-sm mt-2 text-gray-500">{t('generator_page.generator.credit_notice')}</p>
                </div>
              </form>
            </div>

            {/* Result Side */}
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg">
              {isLoading ? (
                <div className="text-center">
                  <Spinner size="lg"/>
                  <p className="mt-4 text-lg font-semibold text-primary-600 dark:text-primary-400">{t('generator_page.result.loading_title')}</p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400 animate-pulse">{loadingMessage}</p>
                </div>
              ) : error ? (
                 <div className="text-center text-red-500">
                    <p>{t('generator_page.result.error_title')}</p>
                    <p className="text-sm">{error}</p>
                 </div>
              ) : generatedVideoUrl ? (
                <div className="w-full">
                  <video src={generatedVideoUrl} controls autoPlay loop className="w-full rounded-lg shadow-md"></video>
                  <a
                    href={generatedVideoUrl}
                    download="creativeai-video.mp4"
                    className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    {t('generator_page.result.download_button')}
                  </a>
                </div>
              ) : (
                 <div className="text-center text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-semibold">{t('generator_page.result.placeholder_title')}</p>
                      <p>{t('generator_page.result.placeholder_subtitle')}</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default GeneratorPage;
