import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cms';

  loadedFeature = '';

  switchView(feature: string){
    this.loadedFeature = feature
  }
}
