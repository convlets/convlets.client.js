// class CommandResponse
// {
// 	public commandID: string = "";
// 	public processID: string = "";
// 	public successful: boolean = false;
// 	public message: string = "";
// }

class CommandResponse
{
	constructor(public commandID: string,
		public processID: string,
		public successful: boolean,
		public message: string) {

	}
}