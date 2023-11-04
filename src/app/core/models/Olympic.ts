
export interface Country {
    id: number;
    country: string;
    participations: Participation[];
}
export interface countryData {
    id: number;
    label: string;
    medalsCount: number;
}
export interface pieData {
    labels: string[];
    datasets: any[];
}
export interface chartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    legend: {
        position: string;
    };
    plugins: {
        legend: {
            onClick: null;
        };
        tooltip: {
            enabled: boolean;
        };
    };
}

export interface participateData {
    id: number;
    label: string;
    medalsCount: number;
    year: number;
  }
  export interface Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
  }
  
  export interface countriesData { 
    id: number;
    label: string;
    country: string;
    athleteCount: number;
    medalsCount: number;
    participations: participateData[];
  }
  export interface medalsByYearData {
    labels: string[];
    datasets: any[];
  }
  export interface Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
  }
  
  
  export interface Country {
    id: number;
    country: string;
    participations: Participation[];
  }
  export interface countryData {
    id: number;
    label: string;
    medalsCount: number;
  }
  export interface pieData {
    labels: string[];
    datasets: any[];
  }
  export interface chartOptions {
    responsive: boolean;
    maintainAspectRatio: boolean;
    legend: {
        position: string;
    };
    plugins: {
        legend: {
            onClick: null;
        };
        tooltip: {
            enabled: boolean;
        };
    };
  }