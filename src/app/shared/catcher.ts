
export class Catcher {
    id:string;
    email:string;
    name:string;
    uid:string;
    status:string;
    type:string;
    token:string;
    userId:string;
    createdAt:string;
    updatedAt:string;
    deletedAt:string;

    constructor(object:JSON){
        const jsonobj = JSON.parse(JSON.stringify(object));
        this.id = jsonobj.id;
        this.email = jsonobj.email;
        this.name = jsonobj.name;
        this.status = jsonobj.status;
        this.type = jsonobj.type;
        this.token = jsonobj.token;
        this.userId = jsonobj.userId;
        this.createdAt = jsonobj.createdAt;
        this.updatedAt = jsonobj.updatedAt;
        this.deletedAt = jsonobj.deletedAt;
    }
  }