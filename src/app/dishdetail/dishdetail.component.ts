import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from './../shared/comment';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ns-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  moduleId: module.id,
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  comment: Comment;
  errMsg: string;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(+params['id'])))
      .subscribe(dish => this.dish = dish,
        errmsg => {this.dish = null; this.errMsg = <any>errmsg; });
  }

  goBack(): void {
    this.routerExtensions.back();
  }

}
