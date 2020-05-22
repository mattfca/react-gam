const _addScript = () => {
  if(!window.googletag){
    const script = document.createElement("script");
    script.src = "https://www.googletagservices.com/tag/js/gpt.js";
    script.async = true;
    document.body.appendChild(script);
  }

  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  
  googletag.cmd.push(function() {
    window.googletag.pubads().disableInitialLoad();
  });
}

const _addScriptA9 = () => {
  if(!window.apstag){
    const script = document.createElement("script");
    script.src = "https://c.amazon-adsystem.com/aax2/apstag.js";
    script.async = true;
    document.body.appendChild(script);

    window.apstag = window.apstag || { _Q: [] };

		function q(c, r) {
			window.apstag._Q.push([c, r]);
		}

		if (typeof window.apstag.init === 'undefined') {
			window.apstag.init = function() {
				q('i', arguments);
			};
		}
		if (typeof window.apstag.fetchBids === 'undefined') {
			window.apstag.fetchBids = function() {
				q('f', arguments);
			};
		}
		if (typeof window.apstag.setDisplayBids === 'undefined') {
			window.apstag.setDisplayBids = function() {};
		}
		if (typeof window.apstag.setDisplayBids === 'undefined') {
			window.apstag.targetingKeys = function() {
				return [];
			};
		}
  }
}

const _addScriptPbjs = () => {
  const pbjsConfig = {
    cache: {
      url: 'https://prebid.adnxs.com/pbc/v1/cache',
    },
    s2sConfig: {
      endpoint: 'https://prebid.adnxs.com/pbs/v1/auction',
      syncEndpoint: 'https://prebid.adnxs.com/pbs/v1/cookie_sync',
    },
    enableSendAllBids: true,
    priceGranularity: 'dense',
  };

  if (_config.ONETRUST_ENABLED) {
    pbjsConfig.consentManagement = {
      cmpApi: 'iab',
      timeout: 8000,
      allowAuctionWithoutConsent: true,
    };
  }
  
  window.pbjs = window.pbjs || { que: [] };

  window.pbjs.que.push(function() {
    window.pbjs.setConfig(pbjsConfig);
  });
}