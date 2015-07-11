///<reference path="ITranslatable.ts" />
///<reference path="IConvletFault.ts" />
var CommandResponse = (function () {
    function CommandResponse(commandID, typeID, processID, successful, faults) {
        this.commandID = commandID;
        this.typeID = typeID;
        this.processID = processID;
        this.successful = successful;
        this.faults = faults;
    }
    return CommandResponse;
})();
