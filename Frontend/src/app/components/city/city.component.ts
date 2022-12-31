import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[] = [];

  selectedCity: City = new City();
  
  constructor(private cityService:CityService) {}

  ngOnInit(): void {
    this.getCities()
  }

  resetForm(form: NgForm) {
    if(form) {
      form.reset()
    }
  }

  addCity(form: NgForm) {
    if(form.value._id) {
      this.cityService.patchCity(form.value)
      .subscribe( res => {
        this.resetForm(form)
        this.getCities()
      })
    } else {
      this.cityService.postCity(form.value)
      .subscribe( res => {
        this.resetForm(form)
        this.getCities()
      })
    }
  }

  getCities() {
    this.cityService.getCities()
    .subscribe( res => {
      this.cities = res as City []
    })
  }

  editCity(city:City) {
    this.selectedCity = city
    console.log("editando");
  }

  deleteCity(city: City) {
    if(confirm('Realmente quiere borrar?')){
      this.cityService.deleteCity(city)
      .subscribe( res => {
        this.getCities()
      })
      console.log("deleteando")
    }
  }

  save(){
    console.log('salvando');
    
  }

  delete() {

  }
}
