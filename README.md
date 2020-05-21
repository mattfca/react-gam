
Example 
```
import React from 'react';
import GAM from 'react-gam';

const gamConfig = {
  DEBUG: true,
  ADOMIK_ENABLED: true,
  A9_ENABLED: true,
  A9_SCRIPT: '',
  A9_PUBID: '3121',
  PBJS_ENABLED: true,
  ONETRUST_ENABLED: true,
  BIDDER_APPNEXUS_PLACEMENTID: '11092385',
  BIDDER_AOL_PLACEMENT: '4523445',
  BIDDER_AOL_NETWORK: '9457.1',
  BIDDER_IX_ID: '11',
  BIDDER_IX_SITEID: '195628',
  BIDDER_CRITEO_ZONEID: '815048',
  BIDDER_RUBICON_ACCOUNTID: '4612',
  BIDDER_RUBICON_SITEID: '211234',
  BIDDER_RUBICON_ZONEID: '1037942',
  BIDDER_OPENX_UNIT: '539911301',
  BIDDER_OPENX_DELDOMAIN: 'match-d.openx.net',
};

const gamUser = {
  gender: 'm'
};

const adUnits = [
  {
    id: "test1",
    unit: "/4595/nfl.test.open",
    sizes: [[728, 90]],
  },
  {
    id: "test2",
    unit: "/4595/nfl.test.open",
    sizes: [[300, 250]],
  },
];

GAM.init(adUnits, gamConfig, gamUser);

function App() {
  return (
    <div className="App">
      <GAM.AdUnit
        id="test1"
       />
       <GAM.AdUnit
        id="test2"
       />
    </div>
  );
}

export default App;
```