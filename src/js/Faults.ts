///<reference path="IConvletFault.ts" />

class FaultsRegistry {
	private all : string[] = [];
	
	constructor() {
		this.all.push("1A3BB01D-18C9-493E-B693-F6725CA9F1FE");
		this.all.push("E54611E3-979D-4B57-93EC-E4B6D06B2C6B");
		this.all.push("E55289A5-5FAE-4125-84BB-954E5AB05606");
	}
	
	contains(typeID:string) : boolean {
		return this.all.some(function(f) {
			return f == typeID;
		});
	}
}

class InvalidData implements IConvletFault {
	public typeID: string;
	
	constructor(public id: string,
		public reference: string) {
		this.typeID = "1A3BB01D-18C9-493E-B693-F6725CA9F1FE";
	}
}

class RequiredDataMissing implements IConvletFault {
	public typeID: string;
	
	constructor(public id: string,
		public reference: string) {
		this.typeID = "E54611E3-979D-4B57-93EC-E4B6D06B2C6B";
	}
}

class UnknownFault implements IConvletFault {
	public typeID: string;
	
	constructor(public id: string,
		public message: string) {
		this.typeID = "E55289A5-5FAE-4125-84BB-954E5AB05606";
	}
}