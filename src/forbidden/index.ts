import { equalTo } from '../equalTo';

export function forbidden<ValidValue = any>(message?: string) {
	return equalTo<ValidValue>(undefined, message);
}
