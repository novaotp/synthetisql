import type { PageLoad } from './$types';
import { config } from '../../utils/config';

export const load: PageLoad = async () => {
	return {
		config: await config()
	};
};
