import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Portfolio} from "../../portfolio/portfolio";
import {Customer} from "../customer";

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrls: ['./add-work.component.css']
})
export class AddWorkComponent implements OnInit{

  id!: string;
  customer!: Customer;
  portfolio!: Portfolio;
  form!: FormGroup;

  constructor(
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['customerId'];
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer = data;
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.customerService.addWork(this.id, this.form.value).subscribe(async (res: any) => {
      console.log('Work added successfully!');
      await this.router.navigateByUrl('portfolio/list');
    })
  }

}
