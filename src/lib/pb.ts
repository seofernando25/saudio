import { browser } from '$app/environment';

import PocketBase from 'pocketbase';

const url = `${browser ? window.location : 'http:0.0.0.0:2500/'}api/pb`;

export const pb = new PocketBase(url);
await pb.admins.authWithPassword('admin@admin.com', 'admin');
