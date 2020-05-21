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
        placement: '4523445',
        network: '9457.1',
      }
    }, 
    {
      bidder: 'ix',
      params: {
        id: '11',
        siteId: '195628',
        size: sizes[0],
      }
    }, 
    {
      bidder: 'criteo',
      params: {
        zoneId: '815048',
      }
    },
    {
      bidder: 'rubicon',
      params: {
        accountId: "4612",
        siteId: "211234",
        zoneId: "1037942"
      }
    },
    {
      bidder: 'openx',
      params: {
        unit: "539911301",
        delDomain: "match-d.openx.net"
      }
    }
  ];

  return bidders;
}