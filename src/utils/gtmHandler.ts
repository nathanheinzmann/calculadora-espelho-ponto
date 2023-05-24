import { dispatchGtmData } from '@/providers/GtmProvider';

export enum GtmHandlerEvents {
  FIRST_LOAD = 'first_load',
}

const initialize = () => {
  dispatchGtmData({
    event: GtmHandlerEvents.FIRST_LOAD,
    pageType: 'home',
  });
};

const gtmHandler = {
  initialize,
};

export default gtmHandler;
