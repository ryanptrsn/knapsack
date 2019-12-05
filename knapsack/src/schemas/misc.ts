import { GenericResponse } from '@knapsack/core/dist/types';
import { KnapsackFile } from '@knapsack/core/dist/cloud';
import { KnapsackBrain } from './main-types';

export { KnapsackFile, GenericResponse };

export interface KnapsackDb<T> {
  savePrep(data: T): Promise<KnapsackFile[]>;
  getData(): Promise<T>;
}

export interface KnapsackDataStoreSaveBody {
  state: import('../client/store').AppState;
  title?: string;
  message?: string;
  storageLocation: 'local' | 'cloud';
}

export interface KnapsackMeta {
  websocketsPort?: number;
  knapsackVersion?: string;
  version?: string;
  changelog?: string;
  hasKnapsackCloud?: boolean;
}

export interface GraphQlContext extends KnapsackBrain {
  canWrite: boolean;
}
