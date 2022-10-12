export default (options: any) => {
  const defaultPadding = options.defaultPadding || {
    top: { base: 0, sm: 0, lg: 0 },
    bottom: { base: 0, sm: 0, lg: 0 },
  };

  const defaultMargin = options.defaultMargin || {
    top: { base: 0, sm: 0, lg: 0 },
    bottom: { base: 0, sm: 0, lg: 0 },
  };

  return {
    setMarginTop: ({
      marginTopSmall,
      marginTopMedium,
      marginTopLarge,
    }: {
      marginTopSmall: string | null;
      marginTopMedium: string | null;
      marginTopLarge: string | null;
    }) => {
      const { base, lg, sm } = defaultMargin.top;

      const mtBase = `mt-${setSizes(marginTopSmall || base)}`;
      const mtSmall = `sm:mt-${setSizes(marginTopMedium || marginTopSmall || sm)}`;
      const mtLarge = `lg:mt-${setSizes(marginTopLarge || marginTopMedium || marginTopSmall || lg)}`;

      return `${mtBase} ${mtSmall} ${mtLarge}`;
    },
    setMarginBottom: ({
      marginBottomSmall,
      marginBottomMedium,
      marginBottomLarge,
    }: {
      marginBottomSmall: string | null;
      marginBottomMedium: string | null;
      marginBottomLarge: string | null;
    }) => {
      const { base, lg, sm } = defaultMargin.bottom;

      const mbBase = `mb-${setSizes(marginBottomSmall || base)}`;
      const mbSmall = `sm:mb-${setSizes(marginBottomMedium || marginBottomSmall || sm)}`;
      const mbLarge = `lg:mb-${setSizes(marginBottomLarge || marginBottomMedium || marginBottomSmall || lg)}`;

      return `${mbBase} ${mbSmall} ${mbLarge}`;
    },
    setPaddingTop: ({
      paddingTopSmall,
      paddingTopMedium,
      paddingTopLarge,
    }: {
      paddingTopSmall: string | null;
      paddingTopMedium: string | null;
      paddingTopLarge: string | null;
    }) => {
      const { base, lg, sm } = defaultPadding.top;

      const ptBase = `pt-${setSizes(paddingTopSmall || base)}`;
      const ptSmall = `sm:pt-${setSizes(paddingTopMedium || paddingTopSmall || sm)}`;
      const ptLarge = `lg:pt-${setSizes(paddingTopLarge || paddingTopMedium || paddingTopSmall || lg)}`;

      return `${ptBase} ${ptSmall} ${ptLarge}`;
    },
    setPaddingBottom: ({
      paddingBottomSmall,
      paddingBottomMedium,
      paddingBottomLarge,
    }: {
      paddingBottomSmall: string | null;
      paddingBottomMedium: string | null;
      paddingBottomLarge: string | null;
    }) => {
      const { base, lg, sm } = defaultPadding.bottom;

      const pbBase = `pb-${setSizes(paddingBottomSmall || base)}`;
      const pbSmall = `sm:pb-${setSizes(paddingBottomMedium || paddingBottomSmall || sm)}`;
      const pbLarge = `lg:pb-${setSizes(paddingBottomLarge || paddingBottomMedium || paddingBottomSmall || lg)}`;

      return `${pbBase} ${pbSmall} ${pbLarge}`;
    },
  };
};

const setSizes = function (size: string | number) {
  switch (Number(size)) {
    case 1:
      return 4;
    case 2:
      return 16;
    case 3:
      return 24;
    case 4:
      return 32;
    case 5:
      return 48;
    case 6:
      return 64;
    default:
      return 0;
  }
};
