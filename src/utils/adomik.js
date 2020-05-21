const Adomik = {
	randomAdGroup: () => {
		const rand = Math.random();
		switch (false) {
			case !(rand < 0.09):
				return 'ad_ex' + Math.floor(100 * rand);
			case !(rand < 0.1):
				return 'ad_bc';
			default:
				return 'ad_opt';
		}
	},
};