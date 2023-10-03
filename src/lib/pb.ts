import { browser } from '$app/environment';
import PocketBase from 'pocketbase';

let url = 'http://0.0.0.0:8090';
if (browser) {
	url = 'http://' + window.location.hostname + ':8090';
}

export const pb = new PocketBase(url);
pb.admins.authWithPassword('admin@admin.com', 'admin');
