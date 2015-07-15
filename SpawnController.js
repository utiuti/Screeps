function SpawnController(spawn, roomController) {
  this.spawn = spawn;
  this.roomController = roomController;
}

SpawnController.prototyp.idle = function() {
    return ( this.spawn.spawning == null );
}

SpawnController.prototyp.create = function(role, creepConfig, memory) {
    var roomLevel = this.roomController.getLevel();
    var maxEnergy = this.roomController.getMaxEnergy();

    var bodyConfig = this.evalCreepBody(roomLevel, maxEnergy, creepConfig.body);
    if ( body != null && body.length ) {
      // spawn creep

      if ( this.spawn.canCreateCreap(body, name) ) {

        // init creep memory
        var memory = memory || {};
        memory['role'] = role

        var result = this.spawn.createCreep(body, name, memory);
      }
    }
}

SpawnController.prototype.evalCreepBody = function(level, maxEnergy, body) {
  var start = ( body.length < level ? body.length : level) - 1 ;

  for ( var i = start; i >= 0; i-- ) {
      var parts = body[i];
      if ( parts.length && this.getCosts(parts) <= maxEnergy ) {
        return parts;
      }
  }
  return null;
}

SpawnController.prototype.getCosts = function(body) {
  var costs = 0;

  if ( body && body.length ) {
    for ( var index in body ) {
        switch (body[index]) {
          case MOVE:
          case CARRY:
            costs += 50;
            break;

          case WORK:
            costs += 100;
            break;

          case ATTACK:
            costs += 80;
            break;

          case RANGED_ATTACK:
            costs += 150;
            break;

          case HEAL:
            costs += 200;
            break;

          case TOUGH:
            costs += 10;
            break;
        }
    }
  }

  return costs;
}

module.exports = SpawnController;
