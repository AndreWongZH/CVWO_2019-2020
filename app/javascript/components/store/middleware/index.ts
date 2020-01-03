import { LOAD_TAGS_SUCCESS } from '../constants';

export const modifyTagsJsonInput = store => (next) => (action) => {
  if (action.type === LOAD_TAGS_SUCCESS) {
    const tagsArray: string[] = [];

    const addTags = (tag) => {
      if (!tagsArray.includes(tag)) {
        tagsArray.push(tag);
      }
    };

    const applyTags = (tags) => {
      tags.tag.split(',').forEach((tag) => addTags(tag));
    };

    action.payload.forEach((tags) => applyTags(tags));

    action.payload = tagsArray;

    return next(action);
  }
  return next(action);
};

export const fire = () => {
  return 'fire';
};
