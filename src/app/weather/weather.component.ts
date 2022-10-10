import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Route, Router } from '@angular/router'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  searchForm: FormGroup
  WeatherData: any
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      city_name: new FormControl('', [Validators.required]),
    })
    this.WeatherData = {
      main: {},
      isDay: true,
    }
  }

  onLogout(){
    this.router.navigate(['']);
  }

  onSearch() {
    this.getWeatherData()
  }

  getWeatherData() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.searchForm.value.city_name}&appid=62fb83b4515a100c38069915715a04d8`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data)
      })
    console.log(this.WeatherData)
  }

  setWeatherData(data: any) {
    this.WeatherData = data
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000)
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString()
    let currentDate = new Date()
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime()
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0)
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0)
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0)
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0)
  }
}
