import { ADD_BOOK } from "../constants/action-types";
import { ActionPayload } from '../types/index';

export function addBook(payload: ActionPayload) {
  return { type: "ADD_BOOK", payload }
};
