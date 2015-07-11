/// <reference path="../TranslationInfo.ts" />
/// <reference path="../Faults.ts" />
/// <reference path="../Events.ts" />
/// <reference path="../Client.ts" />
//TODO: Try using decorators for this instead...
client.registerTranslation(new TranslationInfo("E54611E3-979D-4B57-93EC-E4B6D06B2C6B", function (m) {
    return "Please provide a value for " + m.reference + ".";
}));
client.registerTranslation(new TranslationInfo("1A3BB01D-18C9-493E-B693-F6725CA9F1FE", function (m) {
    return "The value provided for " + m.reference + " is invalid.";
}));
client.registerTranslation(new TranslationInfo("E55289A5-5FAE-4125-84BB-954E5AB05606", function (m) {
    return "" + m.message;
}));
