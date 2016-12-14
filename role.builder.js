var _ = require('lodash');

module.exports = {
    NUMBER_OF_CREEPS: 1,
    work: function(creep) {
        if (creep.carry.energy == creep.carryCapacity || (creep.memory.task == 'build' && creep.carry.energy > 0)) {
            var constructionSite = this.findConstructionSite(creep);
            creep.memory.task = 'build';
                        
            if(constructionSite) {
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
        } else {
            var energyPoint = this.findEnergy(creep);
            creep.memory.task = 'harvest';
            
            if(Game.spawns.Spawn1.energy > 200) {
                if(creep.withdraw(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.Spawn1);
               }
            } else if(creep.harvest(energyPoint) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energyPoint);
            }
        }
    },
    create: function() {
        var builders = _.filter(Game.creeps, {memory: {role: 'builder'}});
        if (_.size(builders) < this.NUMBER_OF_CREEPS && Game.rooms['W69S71'].find(FIND_CONSTRUCTION_SITES)) {
            Game.spawns['Spawn1'].createCreep([MOVE,WORK,CARRY], null, {role: 'builder', task: 'harvest'});
        }
    },
    findConstructionSite: function(creep) {
        return creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    },
    findEnergy: function(creep) {
        return creep.room.find(FIND_SOURCES_ACTIVE)[1];
    }
};
