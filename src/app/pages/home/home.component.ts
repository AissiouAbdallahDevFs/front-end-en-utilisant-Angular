import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Router } from '@angular/router';
import { Chart, InteractionOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  public pieData: any = {};
  public chartOptions: any = {};
  public countriesData: any[] = []; 
  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((data) => {
      console.log(data);
      if (data) {
        this.countriesData = data.map((country: any, index: number) => ({
          id: country.id,
          label: country.country,
          medalsCount: this.calculateTotalMedals(country),
        }));

        this.pieData = {
          labels: this.countriesData.map((countryData: any) => countryData.label),
          datasets: [
            {
              data: this.countriesData.map((countryData: any) => countryData.medalsCount),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
              ],
            },
          ],
        };

        this.chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right',
          },
          plugins: {
            legend: {
              onClick: null,
            },
            tooltip: {
              enabled: true,
            },
          },
        } as InteractionOptions;
      }
    });
  }

  calculateTotalMedals(country: any): number {
    return country.participations.reduce(
      (sum: number, participation: any) => sum + participation.medalsCount,
      0
    );
  }

  onChartClick(event: MouseEvent) {
    if (event) {
      const chartElement = event.target as HTMLCanvasElement;
      const chart = chartElement && Chart.getChart(chartElement);

      if (chart) {
        const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
        if (activePoints.length > 0) {
          const clickedElementIndex = activePoints[0].index;
          const countryId = this.countriesData[clickedElementIndex].id;
          this.router.navigate(['/country', countryId]);
        }
      }
    }
  }
}
