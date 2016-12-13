var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 1,
    work: function(creep) {
        var roads = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });

        if (roads.length > 0 && creep.carry.energy > 5) {
            roads.sort((a,b) => a.hits - b.hits);
            if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roads[0]);
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(Game.spawns.Spawn1.energy > 200) {
                if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
                }
            } else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    },
    create: function() {
        var repairers = _.filter(Game.creeps, {memory: {role: 'repairer'}});
        if (_.size(repairers) < this.NUMBER_OF_CREEPS) {
            Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], null, {role: 'repairer'});
        }
    }
};