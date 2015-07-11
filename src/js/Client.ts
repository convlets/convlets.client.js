///<reference path="IConvletCommand.ts" />
///<reference path="IConvletEvent.ts" />
///<reference path="IConvletFault.ts" />
///<reference path="JSON.ts" />
///<reference path="MessageEnvelope.ts" />
///<reference path="CommandResponse.ts" />
///<reference path="Faults.ts" />
///<reference path="ITranslator.ts" />
///<reference path="ITranslatable.ts" />
///<reference path="../ts/jquery.d.ts" />

var serverUrl = "http://localhost";
var client = {  
    events: new Array<string>(),
    faults: new Array<string>(),
	commands: new Array<string>(),
    translations: new Array<TranslationInfo<ITranslatable>>(),
    send: function(command : IConvletCommand, 
    	callback : (response: CommandResponse) => void) {
        var envelope = 
            new MessageEnvelope(command.typeID, 
                command.id, Serializer.serialize(command));
        var data = Serializer.serialize(envelope);

        //Post to server.
	   $.ajax
	    ({
	        type: "POST",
	        url: serverUrl + "/api/commands",
	        contentType : 'application/json',
	        dataType: 'json',
	        async: true,
	        data: data,
	        success: function (response: CommandResponse) {
	        	callback(response); 
	        },
            error: function (xhr, ajaxOptions, thrownError) {
                var error = `${thrownError}, ${xhr.responseText}, ${xhr.status}`;
                var response =
                    new CommandResponse(command.id, command.typeID, command.processID, 
                        false, [new UnknownFault(command.processID, error)]);
                callback(response); 
            }        
	    });
		// .done(function(data) {
		//   alert(data)
		// })
		// .fail(function() {
		//   alert("Ajax failed to fetch data")
		// });                  	
    },
    registerTranslation : function (translation: TranslationInfo<ITranslatable>) {
        client.translations.push(translation);  
    },
    translate : function (message:ITranslatable) {	
		var results = 
			client.translations.filter(function (t) {
				return t.responseTypeID.toLowerCase()== message.typeID.toLowerCase();
			});
		if(results.length > 0) {
			return results[0].format(message);
		} else {
			var catchAll =
				new TranslationCatchAll(client.commands, client.events, client.faults);
			var translation =
                catchAll.translate(message);  
            if(translation) {
                return translation;
            } else {       
                return  "?";
            }
		}
    },
    registerFault : function (faultTypeID: string) {
        client.faults.push(faultTypeID);  
    },
    registerEvent: function (eventTypeID: string) {
        client.events.push(eventTypeID);  
    },    
    registerCommand: function (commandTypeID: string) {
        client.commands.push(commandTypeID);  
    },    	    
};


class TranslationCatchAll {
    constructor(public commands: string[],
        public events: string[],
        public faults: string[]){
        
    }
    
	forEvents(e:IConvletEvent):string {
		return "";
	}
	
	forFaults(e:IConvletFault):string {
		return "";
	}	
	
    forCommandResponses(response:CommandResponse)
    {
        return "Your message has been sent";
    }	
	
	translate(message:ITranslatable) : string {		
        if(this.commands.some(function(c) {
			return c.toLowerCase() == message.typeID.toLowerCase();
		})) {  
            return this.forCommandResponses(<CommandResponse>message);
        }      
		else if(this.faults.some(function(f) {
			return f.toLowerCase() == message.typeID.toLowerCase();
		})) {
			return this.forFaults(<IConvletFault>message);
		}
		else if(this.events.some(function(e) {
			return e.toLowerCase() == message.typeID.toLowerCase();
		})) {
			return this.forEvents(<IConvletEvent>message);
		}		
		else {
			return "";
		}		
	}
}

 // var message;
 //            var statusErrorMap = {
 //                '400' : "Server understood the request, but request content was invalid.",
 //                '401' : "Unauthorized access.",
 //                '403' : "Forbidden resource can't be accessed.",
 //                '500' : "Internal server error.",
 //                '503' : "Service unavailable."
 //            };
 //            if (x.status) {
 //                message =statusErrorMap[x.status];
 //                                if(!message){
 //                                      message="Unknown Error \n.";
 //                                  }
 //            }else if(exception=='parsererror'){
 //                message="Error.\nParsing JSON Request failed.";
 //            }else if(exception=='timeout'){
 //                message="Request Time out.";
 //            }else if(exception=='abort'){
 //                message="Request was aborted by the server";
 //            }else {
 //                message="Unknown Error \n.";
 //            }