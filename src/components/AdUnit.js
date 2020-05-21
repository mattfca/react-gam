let _idArr = [];

const AdUnit = ({id = ''}) => {
  _idArr.push(id);

  for(let i=0; i<_adUnits.length; i++) {
    if(_adUnits[i].id === id) {
      useGptSlot({
        path: _adUnits[i].unit,
        size: _adUnits[i].sizes,
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