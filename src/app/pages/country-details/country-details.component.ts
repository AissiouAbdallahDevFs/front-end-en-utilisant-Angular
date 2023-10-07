import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit, AfterViewInit {
  countryId!: number;
  countryData: any = {}; // Les données du pays
  medalsByYearData: any = {}; // Données pour le graphique à barres
  @ViewChild('medalsByYearChart') medalsByYearChart!: ElementRef;
 

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService
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
        this.createMedalsByYearChart();
      } else {
        console.error('Aucun pays trouvé avec l\'ID', this.countryId);
      }
    });
  }

  createMedalsByYearChart() {
    const medalsByYearChartCtx = this.medalsByYearChart.nativeElement.getContext('2d');
    const medalsData = this.countryData.participations.map((participation: any) => participation.medalsCount);
    const years = this.countryData.participations.map((participation: any) => participation.year);

    new Chart(medalsByYearChartCtx, {
      type: 'bar',
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
