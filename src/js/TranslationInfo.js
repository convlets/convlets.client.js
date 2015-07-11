/// <reference path="Faults.ts" />
var TranslationInfo = (function () {
    function TranslationInfo(responseTypeID, format, initiatingCommandTypeID, filter) {
        this.responseTypeID = responseTypeID;
        this.format = format;
        this.initiatingCommandTypeID = initiatingCommandTypeID;
        this.filter = filter;
    }
    return TranslationInfo;
})();
