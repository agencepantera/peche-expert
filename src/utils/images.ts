interface ImageSizes {
  sm: string;
  md: string;
  lg: string;
}

export const generateImagePaths = (imagePath: string): ImageSizes => {
  const basePath = imagePath.replace('.webp', '');
  return {
    sm: `${basePath}-sm.webp`,
    md: `${basePath}-md.webp`,
    lg: `${basePath}-lg.webp`
  };
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px'
} as const;
