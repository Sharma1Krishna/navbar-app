import { Routes } from '@angular/router';

// 1. Import all the components you generated
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { SupportComponent } from './pages/support/support.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';

// 2. Map the URL paths to the components
export const routes: Routes = [
  // Default route (redirects to Home when the app loads)
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Main Pages
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'blog', component: BlogComponent },

  // About Dropdown Pages
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'support', component: SupportComponent },

  // Services Dropdown Pages
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'testimonials', component: TestimonialsComponent },

  // Blog Dropdown Pages
  { path: 'faq', component: FaqComponent },

  // Fallback wildcard route (Catches typos and redirects to Home)
  { path: '**', redirectTo: 'home' } 
];