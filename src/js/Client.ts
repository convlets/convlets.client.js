///<reference path="IConvletCommand.ts" />
///<reference path="JSON.ts" />
///<reference path="../ts/jquery.d.ts" />

var serverUrl = "http://localhost";
var client = {  
    events: [],
    send: function(command : IConvletCommand) {
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
	        async: false,
	        data: data,
	        success: function () {
	        	alert("Thanks!"); 
	        },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(xhr.responseText);
            }        
	    });                  	
    }
};




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