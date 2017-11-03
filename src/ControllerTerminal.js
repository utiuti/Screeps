function ControllerTerminal(rc) {
    this.room = rc;
    this.terminal = this.room.getTerminal();
}

// Needs optimization
ControllerTerminal.prototype.internalTrade = function () {
    let MIN_AMOUNT = 20000;
    let [terminal] = this.terminal;
    let cancelOrders = false;

    // if terminal cooldown = 0
    if (this.notBusy) {
        _.each(terminal.store, function (amount, resourceType) {
            if (cancelOrders || amount < MIN_AMOUNT)
                return;
            // How much can Terminal give away?
            var availableAmount = amount - MIN_AMOUNT;

            for (var r in Game.rooms) {
                var aroom = Game.rooms[r];
                // Only check other rooms
                if (cancelOrders || terminal.room.name == aroom.name) {
                    continue;
                }
                var e = aroom.getResourceAmount(resourceType);
                // How much does room need to get MIN_AMOUNT
                var needed = MIN_AMOUNT - e;
                if (needed > 0) {
                    // How much will the terminal send?
                    var sendAmount = Math.min(availableAmount, needed);

                    var result = terminal.send(resourceType, sendAmount, aroom.name, 'internal');
                    if (result == 0) {
                        cancelOrders = true;
                        console.log("Deal:" + terminal.room.name, sendAmount, resourceType + " To: " + aroom.name + e);
                    }
                    
                }
            }
        })
    }
};

Object.defineProperty(ControllerTerminal.prototype, "notBusy", {
    get: function () {
        return _.filter(this.terminal, function (terminal) {
            return terminal.cooldown === 0;
        });
    }
});


module.exports = ControllerTerminal;