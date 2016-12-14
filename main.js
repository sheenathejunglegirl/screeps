var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var attacker = require('role.attacker');
var repairer = require('role.repairer');

module.exports.loop = function() {

    if(!Game.spawns.Spawn1.spawning) {
        harvester.create();
        upgrader.create();
        builder.create();
        attacker.create();
        repairer.create();
    }
    
    for(var i in Memory.creeps) {
        var creep = Game.creeps[i]
        if(!creep) {
            delete Memory.creeps[i];
        } else {
            if(creep.memory.role == 'harvester') {
                harvester.work(creep);
            } else if(creep.memory.role == 'upgrader') {
                upgrader.work(creep);
            } else if(creep.memory.role == 'builder') {
                builder.work(creep);
            } else if(creep.memory.role == 'attacker') {
                attacker.work(creep);
            } else if(creep.memory.role == 'repairer') {
                repairer.work(creep);
            }
        }
    }
}