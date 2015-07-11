///<reference path="ITranslatable.ts" />
///<reference path="IConvletFault.ts" />

class CommandResponse implements ITranslatable
{
	constructor(public commandID: string,
		public typeID: string,
		public processID: string,
		public successful: boolean,
		public faults : IConvletFault[]) {
	}
}