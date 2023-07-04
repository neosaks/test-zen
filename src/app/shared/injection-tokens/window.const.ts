import { InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => inject(DOCUMENT).defaultView!
  },
);
