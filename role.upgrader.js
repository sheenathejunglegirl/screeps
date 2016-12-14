var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 2,
    work: function(creep) {
        if (creep.carry.energy == creep.carryCapacity || (creep.memory.task == 'upgrade' && creep.carry.energy > 0)) {
            var controllerPoint = this.findController(creep);
            creep.memory.task = 'upgrade';
            
            if(creep.upgradeController(controllerPoint) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controllerPoint);                
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
        var upgraders = _.filter(Game.creeps, {memory: {role: 'upgrader'}});
        if (_.size(upgraders) < this.NUMBER_OF_CREEPS) {
            Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY], null, {role: 'upgrader', task: 'harvest'});
        }
    },
    findController: function(creep) {
        return creep.room.controller;
    },
    findEnergy: function(creep) {
        return creep.room.find(FIND_SOURCES_ACTIVE)[0];
    }
};