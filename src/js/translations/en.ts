/// <reference path="../TranslationInfo.ts" />
/// <reference path="../ITranslatable.ts" />
/// <reference path="../IConvletEvent.ts" />
/// <reference path="../IConvletFault.ts" />
/// <reference path="../CommandResponse.ts" />
/// <reference path="../Faults.ts" />
/// <reference path="../Events.ts" />

class TranslationCatchAll {
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
		var faultsRegistry =
			new FaultsRegistry();
		var eventsRegistry =
			new EventsRegistry();			
		if(message instanceof CommandResponse) {
			return this.forCommandResponses(message);
		}
		else if(faultsRegistry.contains(message.typeID)) {
			return this.forFaults(<IConvletFault>message);
		}
		else if(eventsRegistry.contains(message.typeID)) {
			return this.forEvents(<IConvletEvent>message);
		}
		else {
			return "";
		}		
	}
}

class Translator
{
	private translations:TranslationInfo<ITranslatable>[] = [];
	
	constructor() {
		this.translations.push(new TranslationInfo<RequiredDataMissing>("E54611E3-979D-4B57-93EC-E4B6D06B2C6B", 
			function(m) { return `Please provide a value for ${m.reference}.`; }));
		this.translations.push(new TranslationInfo<InvalidData>("1A3BB01D-18C9-493E-B693-F6725CA9F1FE", 
			function(m) { return `The value provided for ${m.reference} is invalid.`; }));
		this.translations.push(new TranslationInfo<UnknownFault>("E55289A5-5FAE-4125-84BB-954E5AB05606", 
			function(m) { return `${m.message}`; }));						
	}	
	
	translate(message:ITranslatable) : string {
		var info = 
			this.translations.filter(function (info) {
				return info.responseTypeID == message.typeID;
			});
		if(info.length > 0) {
			return info[0].format(message);
		} else {
			var catchAll =
				new TranslationCatchAll();
			catchAll.translate(message);
		}
	}	
}