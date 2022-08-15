export const SvgDefinition = {
  key: 'Svg',
  name: 'Svg',
  init: (content: any) => {
    return { ...content, svg: content.svg || {} } as any;
  },
};
