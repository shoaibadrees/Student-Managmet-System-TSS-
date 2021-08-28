import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';

@Injectable()
export class AppService {
  public visitedScreens: string = "";
  public userId: string = null;// 'admin';
  public serviceUrl: string = "http://localhost:4917/";


}
