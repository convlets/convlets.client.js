///<reference path="Guid.ts" />
///<reference path="IConvletFault.ts" />
/// <reference path="Client.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ConvletFault = (function () {
    function ConvletFault(typeID, processID) {
        this.typeID = typeID;
        this.processID = processID;
        this.id = Guid.newGuid();
    }
    return ConvletFault;
})();
var InvalidData = (function (_super) {
    __extends(InvalidData, _super);
    function InvalidData(processID, reference) {
        _super.call(this, "1A3BB01D-18C9-493E-B693-F6725CA9F1FE", processID);
        this.processID = processID;
        this.reference = reference;
    }
    return InvalidData;
})(ConvletFault);
client.registerFault("1A3BB01D-18C9-493E-B693-F6725CA9F1FE");
var RequiredDataMissing = (function (_super) {
    __extends(RequiredDataMissing, _super);
    function RequiredDataMissing(processID, reference) {
        _super.call(this, "E54611E3-979D-4B57-93EC-E4B6D06B2C6B", processID);
        this.processID = processID;
        this.reference = reference;
    }
    return RequiredDataMissing;
})(ConvletFault);
client.registerFault("E54611E3-979D-4B57-93EC-E4B6D06B2C6B");
var UnknownFault = (function (_super) {
    __extends(UnknownFault, _super);
    function UnknownFault(processID, message) {
        _super.call(this, "E55289A5-5FAE-4125-84BB-954E5AB05606", processID);
        this.processID = processID;
        this.message = message;
    }
    return UnknownFault;
})(ConvletFault);
client.registerFault("E55289A5-5FAE-4125-84BB-954E5AB05606");
