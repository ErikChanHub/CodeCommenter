export class StudioStart {

    id: number;
    userId: string;
    userName: string;
    studioVersion: string;
    startDate: number;
    ipMessage: string;

    constructor(id: number, userId: string, userName: string, studioVersion: string, startDate: number, ipMessage: string) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.studioVersion = studioVersion;
        this.startDate = startDate;
        this.ipMessage = ipMessage;
    }
}