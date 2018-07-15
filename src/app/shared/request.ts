
export class Request {
    id:string;
    vin:string;
    requestMessage:string;
    withBackground:boolean;
    isAccepted:boolean;
    requestedTime:string;
    acceptedTime:string;
    finishTime:string;
    catcherId:string;
    createdAt:string;
    updatedAt:string;
    deletedAt:string;
    userId:string;

    catcherName:string;

    constructor(object:JSON){
        const jsonobj = JSON.parse(JSON.stringify(object));
        this.id = jsonobj.id;
        this.vin = jsonobj.vin;
        this.requestMessage = jsonobj.requestMessage;
        this.withBackground = jsonobj.withBackground;
        this.isAccepted = jsonobj.isAccepted;
        this.requestedTime = jsonobj.requestedTime;
        this.acceptedTime = jsonobj.acceptedTime;
        this.finishTime = jsonobj.finishTime;
        this.catcherId = jsonobj.catcherId;
        this.createdAt = jsonobj.createdAt;
        this.updatedAt = jsonobj.updatedAt;
        this.deletedAt = jsonobj.deletedAt;
        this.userId = jsonobj.userId;
        
        this.catcherName = jsonobj.catcherName;
    }
  }