var Behavior = require("_behavior");

var b = new Behavior("miner_harvest");

b.when = function () {
  return true;
};

b.completed = function () {
  return false;
};

b.work = function (creep, rc) {
  var source = creep.getTarget();

  if (!creep.target) {
    source = _.find(rc.getSources(), function (s) {
      return (rc.getCreeps("miner", s.id).length === 0);
    });
  }

  if (source === null) {
    source = Game.getObjectById(creep.target);
  }

  if (source !== null) {
    creep.target = source.id;

    if (creep.container && !(creep.pos.isEqualTo(source.container.pos))) {
      creep.moveTo(source.container);
    } else if (!creep.pos.isNearTo(source)) {
      creep.moveTo(source);
    }

    creep.harvest(source);
    // TODO: Storage + Link in creep memory speichern und benutzen.
    var link = rc.findNearLink(creep);
    // TODO: transfer only when full
    if (link.length) {
      creep.memory.link = link[0].id;
      creep.transfer(link[0], RESOURCE_ENERGY);
    } else {
      creep.drop(RESOURCE_ENERGY);
    }
  }
}

module.exports = b;