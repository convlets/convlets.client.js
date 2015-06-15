// class CommandResponse
// {
// 	public commandID: string = "";
// 	public processID: string = "";
// 	public successful: boolean = false;
// 	public message: string = "";
// }
var CommandResponse = (function () {
    function CommandResponse(commandID, processID, successful, message) {
        this.commandID = commandID;
        this.processID = processID;
        this.successful = successful;
        this.message = message;
    }
    return CommandResponse;
})();
