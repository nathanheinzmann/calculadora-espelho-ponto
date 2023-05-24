declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer: DataLayer | null;
    [key: string]: { [key: string]: string | number };
  }
}

import { createContext, useEffect } from 'react';
import { DataLayer, GtmContextTypes, GtmProviderProps } from './GtmProvider.types';

export const dispatchGtmData = (data: any) => {
  initDataLayer();
  window?.dataLayer?.push(data);
};

export const getGtmData = () => {
  return window.dataLayer;
};

export const GtmContext = createContext<GtmContextTypes>({
  dispatchGtmData,
});

const mountScript = (id: string) => {
  initDataLayer();
  window?.dataLayer?.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const scriptNode = document.createElement('script') as HTMLScriptElement;
  scriptNode.async = true;
  scriptNode.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(scriptNode);
};

const initDataLayer = () => {
  window.dataLayer = (window.dataLayer || []) as DataLayer;
};

const initGtm = (gtmId: string) => mountScript(gtmId);

const GtmProvider = ({ id, children }: GtmProviderProps) => {
  useEffect(() => {
    initGtm(id as string);
  }, [id]);

  return (
    <GtmContext.Provider
      value={{
        dispatchGtmData,
      }}
    >
      {children}
    </GtmContext.Provider>
  );
};

export default GtmProvider;
