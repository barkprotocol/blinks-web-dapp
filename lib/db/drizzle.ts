import { Drizzle, generateStore } from '@drizzle/store';
import drizzleOptions from './drizzle-config';

// Generate the store and create a new instance of Drizzle
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

export { drizzle, drizzleStore };
