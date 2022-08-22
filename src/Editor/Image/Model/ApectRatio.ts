export type CropAspectRatio = {
  label: string;
  ratio: AspectRatio;
};

export type AspectRatio = {
  w: number;
  h: number;
};

export const aspectRatios: CropAspectRatio[] = [
  { label: '16/9', ratio: { w: 16, h: 9 } },
  { label: '9/5', ratio: { w: 9, h: 5 } },
  { label: '4/3', ratio: { w: 4, h: 3 } },
  { label: 'square', ratio: { w: 1, h: 1 } },
  { label: 'freeform', ratio: { w: undefined, h: undefined } },
];
