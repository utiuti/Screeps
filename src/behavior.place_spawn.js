var Behavior = require("_behavior");
var b = new Behavior("place_spawn");

function findFlag(rc) {
    return _.find(Game.flags, {
        'color': COLOR_WHITE
    });
}

b.when = function (creep, rc) {
    let flag = findFlag(rc);
    let spawns = rc.getSpawns();
    return !!flag && flag.room == creep.room && !spawns;
};

b.completed = function (creep, rc) {
    let flag = findFlag(rc);
    let spawns = rc.getSpawns();
    return !flag || (flag.room !== creep.room) || !spawns;
};

b.work = function (creep, rc) {
    let position = rc.getCenterPoint();
    let result = Creep.room.createConstructionSite(position);
    if (result == OK) {
        Log.success(`Build a new construction site for Spawn in ${Creep.room.name}`, "place_spawn")
    } else {
        Log.error(`Could not build Spawn in ${Creep.room.name} Error: ${result}`, "place_spawn")
    }
};

module.exports = b;