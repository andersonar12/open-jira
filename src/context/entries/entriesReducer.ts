import { Entry } from '@/interfaces/entries';
import { EntriesState } from './EntriesProvider';

type EntriesActionType = { type: 'Entries - AddEntry', payload: Entry } | { type: 'Entries - isAdding' } | { type: 'Entries - UPDATED-ENTRY', payload: Entry } | { type: 'Entries - Refresh-Entries', payload: Entry[] } | { type: 'Entries - DELETE-ENTRY', payload: string };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {

    case 'Entries - AddEntry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    case 'Entries - isAdding':
      return {
        ...state,
        isAdding: !state.isAdding
      }

    case 'Entries - UPDATED-ENTRY':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry
        })
      }

    case 'Entries - Refresh-Entries':
      return {
        ...state,
        entries: [...action.payload]
      }

    case 'Entries - DELETE-ENTRY':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload)
      }

    default:
      return state;
  }
};