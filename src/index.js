import * as React from 'react';

const PREBID_TIMEOUT = 1500;
const A9_TIMEOUT = 1500;

let _config = {};

let _user = {};

let _adUnits = [];

let _loaded = {};

const init = (adUnits, config, user = {}) => {
  _config = config;
  _user = user;
  _adUnits = adUnits;
  window.__reactgamloaded = {};

  _addScript();
  if(_config.A9_ENABLED) {
    _addScriptA9();
    window.apstag.init({
      pubID: _config.A9_PUBID,
      adServer: 'googletag'
    })
    _fetchBidsA9();
  }
  if(_config.PBJS_ENABLED) {
    _addScriptPbjs();
    _fetchBidsPbjs();
  }
}

const _fetchBidsA9 = () => {
  let adUnits = [];
  for(let i=0; i<_adUnits.length; i++) {
    adUnits.push({
      slotID: _adUnits[i].id,
      slotName: _adUnits[i].unit,
      sizes: _adUnits[i].sizes,
    })
  }

  window.apstag.fetchBids(
    {
      slots: adUnits,
      timeout: A9_TIMEOUT,
    }, initA9
  );
};

const initA9 = () => {
  _log("bids returned a9");
  _loaded.a9 = true;
  googletag.cmd.push(function() {
    apstag.setDisplayBids();
  });

  if(_loaded.a9 && _loaded.pbjs){
    displayAds();
  }
}

const initPbjs = () => {
  if (pbjs.initAdserverSet) return;
  pbjs.initAdserverSet = true;

  _log("bids returned pbjs");
  _loaded.pbjs = true;

  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  googletag.cmd.push(function() {
    pbjs.que.push(function() {
        pbjs.setTargetingForGPTAsync();
    });
  });

  if(_loaded.a9 && _loaded.pbjs){
    displayAds();
  }
}

const _fetchBidsPbjs = () => {
  let adUnits = [];

  for(let i=0; i<_adUnits.length; i++) {
    let bidders = _generateBidders(_adUnits[i].sizes);

    adUnits.push({
      code: _adUnits[i].unit,
      bids: bidders,
      sizes: _adUnits[i].sizes,
      mediaTypes: {
        banner: {
          sizes: _adUnits[i].sizes,
        }
      }
    })
  }

  pbjs.que = pbjs.que || [];

  pbjs.que.push(function() {
      pbjs.addAdUnits(adUnits);
      pbjs.requestBids({
          bidsBackHandler: initPbjs,
          timeout: PREBID_TIMEOUT
      });
  });

  setTimeout(initPbjs, PREBID_TIMEOUT);
}

const displayAds = () => {
  window.googletag.cmd.push(function() {
    window.googletag.pubads().refresh();
    
    _log('display ads!');
    _log(_config);
    _log(_user);
    _log(_adUnits);
  });
}

export default {init, AdUnit, displayAds};