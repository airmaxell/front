import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgForm, FormGroup } from '@angular/forms';
import { Payload } from '../../shared/payload';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Request } from '../../shared/request';

@Component({
  selector: 'app-new-request',
  templateUrl: './manage-requests.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-requests.component.scss']
})
export class ManageRequestsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private pendingRequests: Array<JSON> = [];
  private inProgressRequests: Array<JSON> = [];
  private finishedRequests: Array<JSON> = [];
  private requestData:MatTableDataSource<Request> = new MatTableDataSource<Request>();
  displayedColumns = ["catcherName", "vin", "createdAt", "acceptedTime", "finishTime", "delete", "edit", "download"];
  
  private isCollapsedNewRequest = true;

  private requestForm:NgForm;

  private modalAddRequest: NgbModalRef;
  
  vin = ""; 
  manufacturer; gearbox; model; engineCap; bodyType; enginePow; fuelType; bodyCol; com; interiorCol;
  catcherId = "";
  withBackground = false;
  requestMessage = "";

  private catchers: Array<JSON> = [];
  payload:Payload;
  vinForm:FormGroup;
  public options = {
    position: ["top", "right"],
    timeOut: 3000,
    lastOnBottom: false,
    showProgressBar: false,
    theClass: "notification-custom"
  }
  private dialogOptions = {
    backdropClass: 'light-blue-backdrop', 
    centered: true, 
    windowClass: 'window-modal'
  };
  isLookup = true;
  submitted = false;

  constructor(private _apiService: ApiService, private _notificationService: NotificationsService, private _modalService: NgbModal) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeData();
    
  }

  initializeData() {
    // Initialize catchers for adding new requests
    this._apiService.getCatchers().subscribe(res => {
      console.log("stiglo nesto");
      this.catchers = <Array<JSON>>res;
      console.log(this.catchers);
    });

    // Initialize requests for showing
    this._apiService.getRequests().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        const element = JSON.parse(JSON.stringify(res[index]));
        for (const catcher of this.catchers) {
          const cat = JSON.parse(JSON.stringify(catcher));
          if(cat.id == element.catcherId) {
            res[index].catcherName = cat.name;
            break;
          }
        }
      }
      this.requestData = new MatTableDataSource(JSON.parse(JSON.stringify(<Array<JSON>>res)));
      this.requestData.paginator = this.paginator;
      
    }, error => {
      this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
    }); 
  }

  // For showing dialog modal Add Request
  showDialogAddRequest(content) {
    this.modalAddRequest = this._modalService.open(content, this.dialogOptions);
    this.modalAddRequest.result.then((result) => {
      console.log("REsult: " + result);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  // For validate and API call Add Request
  sendRequest() {

    if(!this.vin) {
      this._notificationService.error('Error!', "You must enter a VIN!");
      return;
    }
    if(!this.isVinValidate(this.vin)) {
      this._notificationService.error('Error!', "You must enter a VIN!");
    }
    if(this.catcherId == "") {
      this._notificationService.error('Error!', "You must select a Catcher!");
      return;
    }

    if(this.requestMessage == "") {
      this._notificationService.error('Error!', "You must enter a Message!");
      return;
    }

    this._apiService.postRequest(this.vin, this.withBackground, this.requestMessage, this.catcherId).subscribe(response => {
      this._notificationService.success('Success!', "Request is added.");
      this.modalAddRequest.close();
      console.log(response);
    }, error => {
      console.log(error);
      this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
    });

  }

  deleteRequest(id: string) {
    alert("Deleting req: " + id);
  }

  editImages(id: string) {
    alert("Edit images: " + id);
  }

  downloadImages(id: string) {
    alert("Download images: " + id);
  }

  // MAYBE THIS API DOESNT WORK WELL
  isVinValidate(vin:string):boolean {
    if (vin.length === 17) {
      this._apiService.validateVin(vin).then((data) => {
        this.payload = data;
        let content:string = this.payload.ErrorCode;
        //Get the first character (will be error code)
        let code = content.charAt(0);
        //Error code 0 = All good!
        if (code === '0' || code === '8') {
          return true;
        } else {
          false;
        }
      });
    } else {
      return false;
    }
  }

  validateVin(vin:string) {
    if (vin.length === 17) {
      console.log(vin);
      this._apiService.validateVin(vin).then((data) => {
        this.payload = data;
        console.log(this.payload);
        this.checkStatus();
        this.checkWarning();
        this.submitted = false;
        this.isLookup = false;
      });
    } else {
      this._notificationService.error('Error!', `${vin} should be 17 characters length, got: ${vin.length}`);
      this.submitted = false;
    }

  }

  //Returned JSON supplies me with an error status - This is a basic function to retrieve it.
  checkStatus():void {
    let content:string = this.payload.ErrorCode;
    //Get the first character (will be error code)
    let code = content.charAt(0);
    console.log(code);
    //Error code 0 = All good!
    if (code === '0' || code === '8') {
      this.fillVehicleData();
      this._notificationService.success('Success!', "Valid VIN!");
    } 
    //Anything else, we have a problem.
    else {
      this._notificationService.error('Error!', "Invalid VIN!");
      this.payload = new Payload;
    }
}

  //In the event there is any other warnings supplied in the JSON returned.
  checkWarning():void {
    if(this.payload.ErrorCode) {
      let content:string = this.payload.ErrorCode;
      //Get the first character (will be error code)
      let code = content.charAt(0);
      if (code === '8') {
        //Deliver message with extended wait time.
        this._notificationService.warn('Warning!', "No full information provided");
      }
    }
    
  }

  fillVehicleData() {

    this.manufacturer = this.payload.Make;
    this.gearbox = "";
    this.model = this.payload.Model;
    this.engineCap = this.payload.DisplacementL;
    this.bodyType = this.payload.BodyClass;
    this.fuelType = this.payload.FuelTypePrimary;
    this.com = this.payload.PlantCountry;
  }

  private collapseNewRequestForm() {
    this.isCollapsedNewRequest = !this.isCollapsedNewRequest;
    if(this.isCollapsedNewRequest) {
      console.log("reset...");
      this.requestForm.reset();
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onRowClicked(row) {
    console.log(row);
    alert(JSON.stringify(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.requestData.filter = filterValue;
  }


}
