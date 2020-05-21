const _generateBidders = (sizes) => {
  let bidders = [
    {
      bidder: 'appnexus',
      user: {
        gender: _user.gender === 'm' ? 1 : _user.gender === 'f' ? 2 : 0,
        age: _user.age || 0
      },
      allowSmallerSizes: true,
      params: {
        placementId: _config.BIDDER_APPNEXUS_PLACEMENTID,
      }
    }, 
    {
      bidder: 'aol',
      params: {
        placement: _config.BIDDER_AOL_PLACEMENT,
        network: _config.BIDDER_AOL_NETWORK,
      }
    }, 
    {
      bidder: 'ix',
      params: {
        id: _config.BIDDER_IX_ID,
        siteId: _config.BIDDER_IX_SITEID,
        size: sizes[0],
      }
    }, 
    {
      bidder: 'criteo',
      params: {
        zoneId: _config.BIDDER_CRITEO_ZONEID,
      }
    },
    {
      bidder: 'rubicon',
      params: {
        accountId: _config.BIDDER_RUBICON_ACCOUNTID,
        siteId: _config.BIDDER_RUBICON_SITEID,
        zoneId: _config.BIDDER_RUBICON_ZONEID
      }
    },
    {
      bidder: 'openx',
      params: {
        unit: _config.BIDDER_OPENX_UNIT,
        delDomain: _config.BIDDER_OPENX_DELDOMAIN
      }
    }
  ];

  return bidders;
}