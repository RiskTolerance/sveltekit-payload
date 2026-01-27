import * as migration_20260126_145627 from './20260126_145627';
import * as migration_20260127_115724 from './20260127_115724';
import * as migration_20260127_122248 from './20260127_122248';

export const migrations = [
  {
    up: migration_20260126_145627.up,
    down: migration_20260126_145627.down,
    name: '20260126_145627',
  },
  {
    up: migration_20260127_115724.up,
    down: migration_20260127_115724.down,
    name: '20260127_115724',
  },
  {
    up: migration_20260127_122248.up,
    down: migration_20260127_122248.down,
    name: '20260127_122248'
  },
];
