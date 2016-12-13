var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 0,
    work: function(creep) {
        var sources = creep.room.find(FIND_HOSTILE_CREEPS);
        if(creep.attack(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },
    create: function() {
        if (!Game.spawns.Spawn1.room.controller.safeMode || Game.spawns.Spawn1.room.controller.safeMode < 1000) {
            var attackers = _.filter(Game.creeps, {memory: {role: 'attacker'}});
            if (_.size(attackers) < this.NUMBER_OF_CREEPS) {
                Game.spawns['Spawn1'].createCreep([MOVE,ATTACK], null, {role: 'attacker'});
            }
        }
    }
};