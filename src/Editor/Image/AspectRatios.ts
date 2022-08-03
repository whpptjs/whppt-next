import { AspectRatioObject } from '../../Gallery/Model';

export const aspectRatios: AspectRatioObject[] = [
  { label: '16/9', ratio: { w: 16, h: 9 } },
  { label: '9/5', ratio: { w: 9, h: 5 } },
  { label: '4/3', ratio: { w: 4, h: 3 } },
  { label: 'square', ratio: { w: 1, h: 1 } },
  { label: 'freeform', ratio: { w: undefined, h: undefined } },
];
