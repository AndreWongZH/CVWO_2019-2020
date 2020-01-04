/* eslint-disable import/prefer-default-export */

import { LOAD_TAGS_SUCCESS } from '../constants';


export const modifyTagsJsonInput = () => (next: Function) => (action
  : { type: string, payload: { tag: string }[] }) => {
  if (action.type === LOAD_TAGS_SUCCESS) {
    const tagsArray: { text: string, value: string }[] = [];

    const alreadyInArray = (tag: string, tagsArray: { text: string, value: string }[]) => {
      for (let i = 0; i < tagsArray.length; i += 1) {
        if (tagsArray[i].value === tag) {
          return true;
        }
      }
      return false;
    };

    const addTags = (tag: string) => {
      if (!alreadyInArray(tag, tagsArray)) {
        tagsArray.push({ text: tag, value: tag });
      }
    };

    const applyTags = (tagsObj: { tag: string }) => {
      tagsObj.tag.split(',').forEach((tag) => addTags(tag));
    };

    action.payload.forEach((tagsObj: { tag: string }) => applyTags(tagsObj));

    action.payload = tagsArray;

    return next(action);
  }
  return next(action);
};
