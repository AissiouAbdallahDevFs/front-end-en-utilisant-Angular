import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart } from 'chart.js';
import { countriesData, medalsByYearData, Participation, participateData } from '../../core/models/Olympic';




@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})


export class CountryDetailsComponent implements OnInit, AfterViewInit {
  countryId!: number;
  countryData: countriesData | undefined ; 
  medalsByYearData: medalsByYearData | undefined;
  totalMedals: number = 0; 
  totalathleteCount: number = 0;
  entries: number = 0;
  @ViewChild('medalsByYearChart') medalsByYearChart!: ElementRef;
 

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.countryId = +idParam; 
        this.loadCountryDetails();
      } else {
        console.error('ID du pays manquant dans les paramètres de la route.');
      }
    });
  }

  ngAfterViewInit(): void {
    this.createMedalsByYearChart();
  }

  loadCountryDetails() {
    this.olympicService.getCountryDetailsById(this.countryId).subscribe((country) => {
      if (country) {
        console.log('Détails du pays :', country);
        this.countryData = country;
        this.totalMedals = country.participations.map((participation: Participation) => participation.medalsCount).reduce((a: number, b: number) => a + b, 0) ;
        this.totalathleteCount = country.participations.map((participation: Participation) => participation.athleteCount).reduce((a: number, b: number) => a + b, 0) ;
        this.entries = country.participations.map((participation: Participation) => participation.city).length;
        this.createMedalsByYearChart();
      } else {
        console.error('Aucun pays trouvé avec l\'ID', this.countryId);
      }
    });
  }

  backToHome() {
    this.router.navigate(['/']); 
  }

  createMedalsByYearChart() {
    const medalsByYearChartCtx = this.medalsByYearChart.nativeElement.getContext('2d');
    const medalsData = this.countryData?.participations.map((participation: participateData) => participation.medalsCount);
    const years = this.countryData?.participations.map((participation: participateData) => participation.year);

    new Chart(medalsByYearChartCtx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Médailles par année',
            data: medalsData,
            backgroundColor: 'rgb(75, 192, 192)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre de médailles',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Année',
            },
          },
        },
      },
    });
  }
}
