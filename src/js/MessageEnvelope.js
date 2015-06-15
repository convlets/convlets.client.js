var MessageEnvelope = (function () {
    function MessageEnvelope(messageTypeID, messageID, data) {
        this.messageTypeID = messageTypeID;
        this.messageID = messageID;
        this.data = data;
    }
    return MessageEnvelope;
})();
