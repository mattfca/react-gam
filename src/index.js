import * as React from 'react';

const PREBID_TIMEOUT = 1500;
const A9_TIMEOUT = 1500;

let _config = {};
let _user = {};
let _adUnits = [];
let _loaded = {};
let _reUnitArr = [];
let _reIdArr = [];
let _slots = [];
let _reSlots = [];

const init = (adUnits, config, user = {}) => {
  _config = config;
  _user = user;
  _reUnitArr = [];
  _reIdArr = [];

  for(let i=0; i < adUnits.length; i++){
    let obj = {
      sizes: adUnits[i].sizes,
      id: adUnits[i].id,
    };

    adUnits[i].units.forEach(function (item, index) {
      let c = adUnits[i].units[index].constraints

      if(!c) {
        obj.unit =  adUnits[i].units[index].unit;
        return;
      }
      if(Object.keys(c).length === 0){
        obj.unit =  adUnits[i].units[index].unit;
        return;
      }

      let found = false;
      for (var p in c) {
        if (c.hasOwnProperty(p)) {
          let unitConstraint = c[p];
          if(_user.hasOwnProperty(p)){
            if(_user[p] === unitConstraint){
              _log('match on' + p + '=' + unitConstraint)
              found = true;
            }else {
              _log('no match on' + p + '=' + unitConstraint)
              found = false;
            }
          }
        }
      }

      if(found){
        obj.unit =  adUnits[i].units[index].unit;
      }
    });

    let refresh = adUnits[i]._refresh;
    let id = adUnits[i].id;
    let unit = obj.unit;

    if(refresh){
      _reUnitArr.push(unit);
      _reIdArr.push(id);
    }
    
    _adUnits.push(obj);
  }

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
    for (let i=0; i < _adUnits.length; i++){
      window.googletag.display(_adUnits[i].id);
    }

    window.googletag.pubads().refresh();
    
    _log('display ads!');
    _log(_config);
    _log(_user);
    _log(_adUnits);
  });
}

const initRefreshBids = (d) => {
  window.googletag.cmd.push(function() {
    window.pbjs.setTargetingForGPTAsync(_reUnitArr);
    for (let i=0; i < _reIdArr.length; i++){
      window.googletag.display(_reIdArr[i]);
    }
    window.googletag.pubads().refresh(_reSlots);
    _log('refresh done!');
    _log(_reIdArr);
  });
}

const refreshBid = () => {
  if(_config.PBJS_ENABLED) {
    window.pbjs.que.push(function() {
      window.pbjs.requestBids({
          bidsBackHandler: initRefreshBids,
          timeout: PREBID_TIMEOUT,
          adUnitCodes: _reUnitArr,
      });
    });
  }else {
    window.googletag.cmd.push(function() {
      for (let i=0; i < _reIdArr.length; i++){
        window.googletag.display(_reIdArr[i]);
      }
      window.googletag.pubads().refresh(_reSlots);
      _log('refresh done!');
      _log(_reIdArr);
    });
  }
}


export default {init, AdUnit, displayAds, refreshBid};