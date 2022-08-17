export const SvgDefinition = {
  key: 'Svg',
  name: 'Svg',
  init: (content: any) => {
    return { ...content, galleryItemId: content.galleryItemId || '' } as any;
  },
};
