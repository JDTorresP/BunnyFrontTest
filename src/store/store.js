import { writable } from 'svelte/store';

export const usersData = writable([]);
export const tasksData = writable([]);
export const currentStoreUser = writable({});