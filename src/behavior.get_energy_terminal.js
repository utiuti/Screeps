var Behavior = require("_behavior");

var b = new Behavior("get_energy_terminal");

b.when = function (creep, rc) {
return (creep.energy === 0 && rc.room.terminal && rc.room.terminal.store.energy > 0);};

b.completed = function (creep, rc) {
  var target = Game.getObjectById(creep.target);
  return (target === null || creep.energy > 0);
};

b.work = function (creep, rc) {
  var target = creep.getTarget();

  if (target === null) {
    creep.target = rc.room.terminal.id;
  }

  if (target !== null) {
    if (!creep.pos.isNearTo(target)) {
      creep.travelTo(target);
    } else {
      // target.transferEnergy(creep);
      var test = creep.withdraw(target, RESOURCE_ENERGY);
      // creep.moveTo(terminal);
      creep.target = null;
    }
  }
};

module.exports = b;