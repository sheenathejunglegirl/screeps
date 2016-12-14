var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 2,
    work: function(creep) {
        //this.explore(creep);
        //this.controlRoom(creep);
        this.defendRoom(creep);
    },
    create: function() {
        //if (!Game.spawns.Spawn1.room.controller.safeMode || Game.spawns.Spawn1.room.controller.safeMode < 1000) {
            var attackers = _.filter(Game.creeps, {memory: {role: 'attacker'}});
            if (_.size(attackers) < this.NUMBER_OF_CREEPS) {
                Game.spawns['Spawn1'].createCreep([MOVE,ATTACK], null, {role: 'attacker'});
            }
        //}
    },
    defendRoom: function(creep) {
        var sources = creep.room.find(FIND_HOSTILE_CREEPS);
        if(creep.attack(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },
    controlRoom: function(creep) {
        if(creep.room.controller) {
            console.log(creep.claimController(creep.room.controller));
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    explore: function(creep) {
        var dest = 'W67S71';
        if(creep.room.name != dest){
            creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(dest)));
        }
    }
};