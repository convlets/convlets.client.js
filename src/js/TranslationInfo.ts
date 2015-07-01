/// <reference path="Faults.ts" />

class TranslationInfo<TMessage>
{
	constructor(public responseTypeID: string,
        public format: (f : TMessage) => string, public initiatingCommandTypeID?: string,
		public filter?: string) {
			
    }    
}