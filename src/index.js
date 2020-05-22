import * as React from 'react';

const PREBID_TIMEOUT = 1500;
const A9_TIMEOUT = 1500;

class GAM {
  constructor(adUnits, gamConfig, gamUser){
    this.gamUser = gamUser;
    this.gamConfig = gamConfig;
    this.adUnits = adUnits;
    this.gamAdUnits = [];
    this.idArr = [];
    this.reIdArr = [];
    this.reUnitArr = [];
    this.slots = [];
    this.reSlots = [];
    this.loaded = {};

    this.bidResponsePbjs = this.bidResponsePbjs.bind(this);
    this.refreshBid = this.refreshBid.bind(this);
    this.renderAdUnit = this.renderAdUnit.bind(this);
    this.useGptSlot = this.useGptSlot.bind(this);

    this.defineAdUnits();
    this.initializeGpt();
    if(this.gamConfig.A9_ENABLED) this.initializeA9();
    if(this.gamConfig.PBJS_ENABLED) this.initializePbjs();
    if(this.gamConfig.A9_ENABLED) this.fetchBidsA9();
    if(this.gamConfig.PBJS_ENABLED) this.fetchBidsPbjs();
  }

  // renderAdUnit
  renderAdUnit({id}){
    console.log('id::::',id)

    for(let i=0; i<this.gamAdUnits.length; i++) {
      if(this.gamAdUnits[i].id === id) {
        this.useGptSlot({
          path: this.gamAdUnits[i].unit,
          size: this.gamAdUnits[i].sizes,
          id: id,
        });
        break;
      }
    }
    
    return (
      <div
        id={id}
        style={{ width: 'auto', height: 'auto' }}
      />
    );
  }

  // refreshBidResponsePbjs
  refreshBidResponsePbjs(){
    window.googletag.cmd.push(() => {
      window.pbjs.setTargetingForGPTAsync(this.reUnitArr);
      for (let i=0; i < this.reIdArr.length; i++){
        window.googletag.display(this.reIdArr[i]);
      }
      console.log("slots", this.reSlots)
      window.googletag.pubads().refresh(this.reSlots);
      this.log('Refreshing ad units with pbjs');
      this.log(this.reIdArr);
    });
  }

  // refreshBid
  refreshBid(){
    console.log('re', this.reSlots)
    console.log('re', this.reUnitArr)
    console.log('re', this.reIdArr)
    if(this.gamConfig.PBJS_ENABLED) {
      window.pbjs.que.push(() => {
        window.pbjs.requestBids({
            bidsBackHandler: () => this.refreshBidResponsePbjs(),
            timeout: PREBID_TIMEOUT,
            adUnitCodes: this.reUnitArr,
        });
      });
    }else {
      window.googletag.cmd.push(function() {
        for (let i=0; i < this.reIdArr.length; i++){
          window.googletag.display(this.reIdArr[i]);
        }
        window.googletag.pubads().refresh(this.reSlots);
        this.log('Refreshing ad units');
        this.log(this.reIdArr);
      });
    }
  }

  // useGptSlot
  useGptSlot({ path, size, id }){
    React.useEffect(() => {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.googletag.cmd.push(() => {
        let definedSlot = window.googletag.defineSlot(path, size, id);
        if (this.gamConfig.ADOMIK_ENABLED) definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
        if (this.gamConfig.ADOMIK_ENABLED) definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());
        const entries = Object.entries(this.gamUser)
        for (const [key, value] of entries) {
          definedSlot.setTargeting(key, value);
        }
        definedSlot.addService(window.googletag.pubads());
        this.slots.push(definedSlot);   
        if(this.reIdArr.includes(id)) this.reSlots.push(definedSlot);
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
      }); 
      
    }, [path, size, id]);
  }

  // displayAds
  displayAds(){
    window.googletag.cmd.push(() => {
      for (let i=0; i < this.gamAdUnits.length; i++){
        window.googletag.display(this.gamAdUnits[i].id);
      }
  
      window.googletag.pubads().refresh();
      
      this.log('Rendering ad units');
    });
  }

  // bidResponsePbjs
  bidResponsePbjs(){
    this.log('Bids returned from pbjs');

    if (this.loaded.pbjs) return;
    this.loaded.pbjs = true;

    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    googletag.cmd.push(function() {
      pbjs.que.push(function() {
          window.pbjs.setTargetingForGPTAsync();
      });
    });

    if(this.loaded.a9 && this.loaded.pbjs){
      this.log('pbjs render ads');
      this.displayAds();
    }
  }

  // fetchBidsPbjs
  fetchBidsPbjs(){
    let adUnits = [];

    for(let i=0; i<this.gamAdUnits.length; i++) {
      let bidders = this.generateBidders(this.gamAdUnits[i].sizes);

      adUnits.push({
        code: this.gamAdUnits[i].unit,
        bids: bidders,
        sizes: this.gamAdUnits[i].sizes,
        mediaTypes: {
          banner: {
            sizes: this.gamAdUnits[i].sizes,
          }
        }
      })
    }

    this.log('Fetching bids from pbjs');
    this.log(adUnits);

    window.pbjs.que = window.pbjs.que || [];

    window.pbjs.que.push(function() {
      window.pbjs.addAdUnits(adUnits);
      window.pbjs.requestBids({
          bidsBackHandler: () => this.bidResponsePbjs(),
          timeout: PREBID_TIMEOUT
      });
    });

    setTimeout(this.bidResponsePbjs, PREBID_TIMEOUT);
  }

  // fetchBidsA9
  fetchBidsA9(){
    let adUnits = [];
    for(let i=0; i<this.gamAdUnits.length; i++) {
      adUnits.push({
        slotID: this.gamAdUnits[i].id,
        slotName: this.gamAdUnits[i].unit,
        sizes: this.gamAdUnits[i].sizes,
      })
    }

    this.log('Fetching bids from A9');
    this.log(adUnits);

    window.apstag.fetchBids(
      {
        slots: adUnits,
        timeout: A9_TIMEOUT,
      }, () => {
        this.log('Bids returned from A9');

        this.loaded.a9 = true;
        googletag.cmd.push(function() {
          apstag.setDisplayBids();
        });

        if(this.loaded.a9 && this.loaded.pbjs){
          this.log('a9 render ads');
          this.displayAds();
        }
      }
    );
  }

  // initializePbjs
  initializePbjs(){
    this.log('Initialize pbjs');

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
  
    if (this.gamConfig.ONETRUST_ENABLED) {
      pbjsConfig.consentManagement = {
        cmpApi: 'iab',
        timeout: 8000,
        allowAuctionWithoutConsent: true,
      };
    }
    
    window.pbjs = window.pbjs || { que: [] };
  
    window.pbjs.que.push(() => {
      window.pbjs.setConfig(pbjsConfig);
    });
  }

  // initializeA9
  initializeA9(){
    this.log('Initialize a9');

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

    window.apstag.init({
      pubID: this.gamConfig.A9_PUBID,
      adServer: 'googletag'
    })
  }

  // initializeGpt
  initializeGpt(){
    this.log('Initialize gpt');

    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];

    googletag.cmd.push(function() {
      window.googletag.pubads().disableInitialLoad();
    });

    if(!window.googletag.apiReady){
      const script = document.createElement("script");
      script.src = "https://www.googletagservices.com/tag/js/gpt.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }

  // defineAdUnits
  defineAdUnits(){
    const adUnits = this.adUnits;

    for(let i=0; i < adUnits.length; i++){
      let obj = {
        sizes: adUnits[i].sizes,
        id: adUnits[i].id,
      };
  
      adUnits[i].units.forEach((item, index) => {
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
            if(this.gamUser.hasOwnProperty(p)){
              if(this.gamUser[p] === unitConstraint){
                found = true;
              }else {
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
        this.reUnitArr.push(unit);
        this.reIdArr.push(id);
      }
      
      this.gamAdUnits.push(obj);
    }
  }

  generateBidders(sizes){
    let bidders = [];
  
    if(this.gamConfig.BIDDER_APPNEXUS_ENABLED) bidders.push({
      bidder: 'appnexus',
      user: {
        gender: this.gamUser.gender === 'm' ? 1 : this.gamUser.gender === 'f' ? 2 : 0,
        age: this.gamUser.age || 0
      },
      allowSmallerSizes: true,
      params: {
        placementId: this.gamConfig.BIDDER_APPNEXUS_PLACEMENTID,
      }
    });
  
    if(this.gamConfig.BIDDER_AOL_ENABLED) bidders.push({
      bidder: 'aol',
      params: {
        placement: this.gamConfig.BIDDER_AOL_PLACEMENT,
        network: this.gamConfig.BIDDER_AOL_NETWORK,
      }
    });
  
    if(this.gamConfig.BIDDER_IX_ENABLED) bidders.push({
      bidder: 'ix',
      params: {
        id: this.gamConfig.BIDDER_IX_ID,
        siteId: this.gamConfig.BIDDER_IX_SITEID,
        size: sizes[0],
      }
    });
  
    if(this.gamConfig.BIDDER_CRITEO_ENABLED) bidders.push({
      bidder: 'criteo',
      params: {
        zoneId: this.gamConfig.BIDDER_CRITEO_ZONEID,
      }
    });
  
    if(this.gamConfig.BIDDER_RUBICON_ENABLED) bidders.push({
      bidder: 'rubicon',
      params: {
        accountId: this.gamConfig.BIDDER_RUBICON_ACCOUNTID,
        siteId: this.gamConfig.BIDDER_RUBICON_SITEID,
        zoneId: this.gamConfig.BIDDER_RUBICON_ZONEID
      }
    });
  
    if(this.gamConfig.BIDDER_OPENX_ENABLED) bidders.push({
      bidder: 'openx',
      params: {
        unit: this.gamConfig.BIDDER_OPENX_UNIT,
        delDomain: this.gamConfig.BIDDER_OPENX_DELDOMAIN
      }
    });
  
    return bidders;
  }

  // logDetails
  logDetails(){
    console.log(this.gamUser);
    console.log(this.gamConfig);
    console.log(this.reUnitArr);
    console.log(this.reIdArr);
    console.log(this.gamAdUnits);
  }

  log(msg){
    if(this.gamConfig.DEBUG){
      console.log(msg)
    }
  }
}

module.exports = GAM