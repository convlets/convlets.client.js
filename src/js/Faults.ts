///<reference path="Guid.ts" />
///<reference path="IConvletFault.ts" />
/// <reference path="Client.ts" />

class ConvletFault implements IConvletFault {
	public id: string;
	constructor(public typeID: string,
		public processID: string) {
		this.id = Guid.newGuid();
	}
}

class InvalidData extends ConvletFault {
	constructor(public processID: string, 
		public reference: string) {
		super("1A3BB01D-18C9-493E-B693-F6725CA9F1FE", processID);
	}
}
client.registerFault("1A3BB01D-18C9-493E-B693-F6725CA9F1FE");

class RequiredDataMissing extends ConvletFault {
	constructor(public processID: string,
		public reference: string) {
		super("E54611E3-979D-4B57-93EC-E4B6D06B2C6B", processID);
	}
}
client.registerFault("E54611E3-979D-4B57-93EC-E4B6D06B2C6B");

class UnknownFault extends ConvletFault {
	public typeID: string;
	
	constructor(public processID: string, 
		public message: string) {
		super("E55289A5-5FAE-4125-84BB-954E5AB05606", processID);
	}
}
client.registerFault("E55289A5-5FAE-4125-84BB-954E5AB05606");
