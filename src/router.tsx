import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage }      from '@/pages/Home'
import { ServicesPage }  from '@/pages/Services'
import { WorkPage }      from '@/pages/Work'
import { CaseStudyPage } from '@/pages/CaseStudy'
import { AboutPage }     from '@/pages/About'
import { ContactPage }   from '@/pages/Contact'
import { QuotePage }     from '@/pages/Quote'
import { InsightsPage }  from '@/pages/Insights'
import { PrivacyPage }   from '@/pages/Legal/PrivacyPage'
import { TermsPage }     from '@/pages/Legal/TermsPage'
import { NotFoundPage }  from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,        element: <HomePage />      },
      { path: 'services',   element: <ServicesPage />  },
      { path: 'work',       element: <WorkPage />       },
      { path: 'work/:slug', element: <CaseStudyPage /> },
      { path: 'about',      element: <AboutPage />      },
      { path: 'contact',    element: <ContactPage />    },
      { path: 'quote',      element: <QuotePage />      },
      { path: 'insights',   element: <InsightsPage />   },
      { path: 'privacy',    element: <PrivacyPage />    },
      { path: 'terms',      element: <TermsPage />      },
      { path: '*',          element: <NotFoundPage />   },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
