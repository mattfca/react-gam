const useGptSlot = ({ path, size, id }) => {
  React.useEffect(() => {
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    googletag.cmd.push(function() {
      let definedSlot = window.googletag.defineSlot(path, size, id);
      if (_config.ADOMIK_ENABLED) definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
      if (_config.ADOMIK_ENABLED) definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());
      const entries = Object.entries(_user)
      for (const [key, value] of entries) {
        definedSlot.setTargeting(key, value);
      }
      definedSlot.addService(window.googletag.pubads());
      _slots.push(definedSlot);   
      if(_reIdArr.includes(id)) _reSlots.push(definedSlot);
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    }); 
  }, [path, size, id]);
};