import React from 'react';

export type GtmProviderProps = {
  id?: string;
  children?: React.ReactNode;
};

export type Dictionary<T> = {
  [key: string]: T;
};

export type DispatchGtmData = (data: Dictionary<string>) => void;

export type GtmContextTypes = {
  dispatchGtmData: DispatchGtmData;
};

export type DataLayer = {
  [key: string]: string | number | any;
}[];
