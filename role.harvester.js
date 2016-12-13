var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 2,
    work: function(creep) {
        if (creep.carry.energy == creep.carryCapacity || (creep.memory.task == 'store' && creep.carry.energy > 0)) {
            var storagePoint = this.findStorage(creep);
            creep.memory.task = 'store';

            if(creep.transfer(storagePoint, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storagePoint);
            }
        } else {
            var energyPoint = this.findEnergy(creep);
            creep.memory.task = 'harvest';
            
            if(creep.harvest(energyPoint) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energyPoint);
            }
        }
    },
    create: function() {
        var harvesters = _.filter(Game.creeps, {memory: {role: 'harvester'}});
        if (_.size(harvesters) < this.NUMBER_OF_CREEPS) {
            Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY], null, {role: 'harvester', task: 'harvest'});
        }
    },
    findStorage: function(creep) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure)  {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
            }
        });
    },
    findEnergy: function(creep) {
        return creep.room.find(FIND_SOURCES_ACTIVE)[1]; //42, 21
    }
};
