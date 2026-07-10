import test from 'node:test';
import assert from 'node:assert/strict';

import { buildPublicStatsPayload } from '../src/controllers/publicController.js';

test('buildPublicStatsPayload returns combined landing statistics', () => {
  const payload = buildPublicStatsPayload({
    totalUsers: 128,
    totalDonors: 42,
    bloodRequests: 18,
    emergencyRequests: 7
  });

  assert.deepEqual(payload, {
    totalUsers: 128,
    totalDonors: 42,
    bloodRequests: 18,
    emergencyRequests: 7
  });
});
