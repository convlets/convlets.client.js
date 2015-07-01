///<reference path="IConvletEvent.ts" />

class EventsRegistry {
	private all : string[] = [];
	
	constructor() {

	}
	
	contains(typeID:string) : boolean {
		return this.all.some(function(f) {
			return f == typeID;
		});
	}
}