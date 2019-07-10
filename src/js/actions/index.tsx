import { ADD_BOOK, ACTIVATE_SCEEN } from "../constants/action-types";
import { ActionPayload, Book } from '../types/index';

export function addBook(payload: Book): ActionPayload {
  return {
    type: ADD_BOOK,
    payload
  }
};

export function activateSceen(payload: String): ActionPayload {
  return {
    type: ACTIVATE_SCEEN,
    payload
  }
};
