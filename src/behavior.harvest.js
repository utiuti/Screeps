var Behavior = require("_behavior");

var b = new Behavior("harvest");

b.when = function (creep, rc) {
  /* var sources = _.find(rc.getSources(), function (s) {
    return (rc.getCreeps("miner", s.id).length === 0);
  });
 */
  return (creep.energy === 0);
};

b.completed = function (creep, rc) {
  var source = creep.getTarget();
  return (creep.energy === creep.energyCapacity || source.energy === 0);
};

b.work = function (creep, rc) {
  var source = creep.getTarget();

  if (source === null) {
    /* var sources = _.find(rc.getSources(), function (s) {
      return (rc.getCreeps("miner", s.id).length === 0);
    }); */

    var sources = rc.getSourcesNotEmpty();
    if (sources.length) {
      // Source per Zufall auswählen
      source = sources[Math.floor(Math.random() * sources.length)];
    }
  }

  if (source !== null) {
    creep.target = source.id;
    if (!creep.pos.isNearTo(source)) {
      creep.travelTo(source);
    } else {
      creep.harvest(source);
    }
  }
};

module.exports = b;
