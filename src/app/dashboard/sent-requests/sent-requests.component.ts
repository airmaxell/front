import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.scss']
})
export class SentRequestsComponent implements OnInit {

  private pendingRequests: Array<JSON> = [];
  private inProgressRequests: Array<JSON> = [];
  private finishedRequests: Array<JSON> = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    const res = this._apiService.getRequests().subscribe(res => {
      res.forEach(request=> {
        if(!request.isAccepted) {
          this.pendingRequests.push(request);
        } else if(request.finishTime == null) {
          this.inProgressRequests.push(request);
        } else {
          this.finishedRequests.push(request);
        }
      })
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

}
