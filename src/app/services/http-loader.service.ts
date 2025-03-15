import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HTTPLoaderService {
  isLoading = signal(false);
}
