export const MEDIA_TYPE_LABEL = {
  video: '视频',
  marmoset: 'Marmoset',
  image: '图片'
};

export const getMediaTypeLabel = (type) => {
  return MEDIA_TYPE_LABEL[type] || MEDIA_TYPE_LABEL.image;
};
