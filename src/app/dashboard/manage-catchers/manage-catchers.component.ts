import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { Catcher } from '../../shared/catcher';

@Component({
  selector: 'app-new-catcher',
  templateUrl: './manage-catchers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./manage-catchers.component.scss']
})

export class ManageCatchersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  closeResult: string;

  ec_id = ""; ec_name= ""; ec_email = ""; ec_password = "";
  name = ""; email = ""; password = ""; 
  
  displayedColumns = ["name", "email", "requestCount", "averageTime", "editCatcher", "deleteCatcher"];
  private catchersData:MatTableDataSource<Catcher> = new MatTableDataSource<Catcher>();

  public notificationOptions = {
    position: ["top", "right"],
    timeOut: 3000,
    lastOnBottom: false,
    showProgressBar: false,
    theClass: "notification-custom"
  }

  private modalAddCatcher: NgbModalRef;
  private modalEditCatcher: NgbModalRef;

  private dialogOptions = {
    backdropClass: 'light-blue-backdrop', 
    centered: true, 
    windowClass: 'window-modal'
  };

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _apiService:ApiService, private _notificationService: NotificationsService, private _modalService: NgbModal) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initializeData();
  }

  // For retriving catcher list from DB
  private initializeData() {
    this._apiService.getCatchers().subscribe(res => {
      this.catchersData = new MatTableDataSource(JSON.parse(JSON.stringify(<Array<JSON>>res)));
      this.catchersData.paginator = this.paginator;
      this.catchersData.sort = this.sort;
    }, error => {
      this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
    });
  }


  // For validating `Add Catcher` form
  validateForm():Boolean {
    if(this.name.length < 1){
      this._notificationService.error('Error!', `Name is empty!`);
      return false;
    }
    if(this.email.length < 1){
      this._notificationService.error('Error!', `Email is empty!`);
      return false;
    }
    if(this.password.length < 6){
      this._notificationService.error('Error!', `Password must be at least 6 character length!`);
      return false;
    }
    return true;
  }

  // For showing dialog modal Add Catcher
  showDialogAddCatcher(content) {
    this.modalAddCatcher = this._modalService.open(content, this.dialogOptions);
    this.modalAddCatcher.result.then((result) => {
      console.log("Result: " + result);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  // For validate and API call Add Catcher
  addCatcher(catcherForm:NgForm, modal) {
    if(this.validateForm()) {
      this._apiService.postCatcher(this.name, this.email, this.password).subscribe(result => {
        let res = JSON.parse(JSON.stringify(result));
        this._notificationService.success('Success!', "Added user: " + res.email);
        this.initializeData();
        catcherForm.reset();
        this.modalAddCatcher.close();
      }, error=> {
        // console.log(error);
        this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
      });
    }
  }


  // For showing dialog modal Edit Catcher
  showDialogEditCatcher(content, catcher) {
    this.editCatcher(catcher);
    this.modalEditCatcher = this._modalService.open(content, this.dialogOptions);
    this.modalEditCatcher.result.then((result:NgForm) => {
      this.postEditCatcher();
    }, (reason) => {
      console.log("Dismissed ${this.getDismissReason(reason)}");
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  // For update Edit Catcher form values
  editCatcher(catcher) {
    this.ec_id = catcher.id;
    this.ec_name = catcher.name;
    this.ec_email = catcher.email;
  }

  // For API call Edit Catcher
  postEditCatcher() {
    this._apiService.editCatcher(this.ec_id, this.ec_email, this.ec_name).subscribe(res => {
      this._notificationService.success("Success!", "User is updated.");
      this.initializeData();
      this.modalEditCatcher.close();
    }, error => {
      console.log(error);
      this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
    });
  }


  // For showing dialog modal Confirm Delete Catcher
  confirmDeleteCatcher(content, catcher) {
    this._modalService.open(content, this.dialogOptions).result.then((result) => {
      this.deleteCatcher(result);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    }); 
  }

  // For API call Delete Catcher
  deleteCatcher(catcherId) {
    this._apiService.deleteCatcher(catcherId).subscribe(res=>{
      this._notificationService.success("Success!", "User is deleted.");
      this.initializeData();
    }, error => {
      console.log(error);
      this._notificationService.error(error.error.message + ": " + error.error.code, error.error.description[0].message);
    });
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
    this.catchersData.filter = filterValue;
  }

}



