import * as ancient from './ancient.js';
import * as medieval from './medieval.js';
import * as modern from './modern.js';
import { MODEL_IMG } from '../../data/wiki.js';

export const MODELS = [...Object.values(ancient), ...Object.values(medieval), ...Object.values(modern)].sort(
  (a, b) => a.year - b.year,
);
export const MODEL_BY_ID = Object.fromEntries(MODELS.map((m) => [m.id, m]));
for (const m of MODELS) m.img = m.img || MODEL_IMG[m.id] || null;
