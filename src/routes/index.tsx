// import { Suspense, lazy, type ComponentType } from 'react';
// import { Navigate, useRoutes } from 'react-router-dom';

// import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
// import {  AuthGuard, GuestGuard } from '@/guards';
// import OnboardingGuard from '@/guards/OnboardingGuard';
// import ResetPasswordRedirect from './ResetPasswordRedirect';

// // ============================================
// // HOC pour le lazy loading
// // ============================================
// function Loadable<T extends ComponentType<any>>(Component: T) {
//   return function LoadableComponent(props: React.ComponentProps<T>) {
//     return (
//       <Suspense fallback={<LoadingSpinner fullScreen message="Chargement..." />}>
//         <Component {...props} />
//       </Suspense>
//     );
//   };
// }

// // ============================================
// // Lazy-loaded pages
// // ============================================

// // Layouts
// const AuthLayout = Loadable(lazy(() => import('@/components/layouts/AuthLayout')));
// const CommercialLayout = Loadable(lazy(() => import('@/components/layouts/CommercialLayout')));
// // Note: MainLayout disponible si besoin pour d'autres pages protégées
// // const MainLayout = Loadable(lazy(() => import('@/components/layouts/MainLayout')));
//   // Pages Auth
// const LoginPage = Loadable(lazy(() => import('@/pages/auth/login')));
// const RegisterPage = Loadable(lazy(() => import('@/pages/auth/register')));
// const ForgotPasswordPage = Loadable(lazy(() => import('@/pages/auth/forgot-password')));
// const ResetPasswordPage = Loadable(lazy(() => import('@/pages/auth/reset-password')));
// const VerifyEmailPage = Loadable(lazy(() => import('@/pages/auth/verify-email')));
// const UnauthorizedPage = Loadable(lazy(() => import('@/pages/auth/unauthorized')));

// // Pages publiques
// const HomePage = Loadable(lazy(() => import('@/components/home')));
// const NotFoundPage = Loadable(lazy(() => import('@/components/layouts/NotFoundPage')));

// // Pages protégées par rôle
// const ConsultantDashboard = Loadable(lazy(() => import('@/pages/consultant/dashboard')));
// const CommercialDashboard = Loadable(lazy(() => import('@/pages/commercial/dashboard')));
// const AdminDashboard = Loadable(lazy(() => import('@/pages/admin/dashboard')));
// const AdminUsersPage = Loadable(lazy(() => import('@/pages/admin/users')));
// const CreateOfferPage = Loadable(lazy(() => import('@/pages/commercial/CreateOffer')));
// const CandidatListPage = Loadable(lazy(() => import('@/pages/commercial/CandidatList')));
// const NdaListPage = Loadable(lazy(() => import('@/pages/commercial/NdaList')));
// const MatchOfConsultingPage = Loadable(lazy(() => import('@/pages/commercial/MatchOfConsulting')));
// const WelcomeOnboardingPage = Loadable(lazy(() => import('@/pages/consultant/welcome')));
// const LinkedInOnboardingPage = Loadable(lazy(() => import('@/pages/consultant/linkedin')));
// const ConsultantProfilePage = Loadable(lazy(() => import('@/pages/consultant/profile')));
// const CommercialProfilePage = Loadable(lazy(() => import('@/pages/commercial/profile')));
// const ConsultantOpportunityPage = Loadable(lazy(() => import('@/pages/consultant/OpportunityPage')));
// const ConsultantOpportunityDetails = Loadable(lazy(() => import('@/pages/consultant/OpportunityDetails')));
// const ConsultantHistoryPage = Loadable(lazy(() => import('@/pages/consultant/HistoryPage')));
// const SignNDAPage = Loadable(lazy(() => import('@/pages/consultant/SignNDA')));

// // ============================================
// // Configuration des routes
// // ============================================
// export default function Router() {
//   return useRoutes([
//     // Routes d'authentification (invités uniquement)
//     {
//       path: 'auth',
//       element: <AuthLayout />,
//       children: [
//         {
//           path: 'login',
//           element: (
//             <GuestGuard>
//               <LoginPage />
//             </GuestGuard>
//           ),
//         },
//         {
//           path: 'register',
//           element: (
//             <GuestGuard>
//               <RegisterPage />
//             </GuestGuard>
//           ),
//         },
//         {
//           path: 'forgot-password',
//           element: (
//             <GuestGuard>
//               <ForgotPasswordPage />
//             </GuestGuard>
//           ),
//         },
//         {
//           path: 'reset-password',
//           element: (
//             <GuestGuard>
//               <ResetPasswordPage />
//             </GuestGuard>
//           ),
//         },
//         {
//           path: 'verify-email',
//           element: <VerifyEmailPage />,
//         },
//       ],
//     },

//     // Page d'accès non autorisé
//     {
//       path: 'unauthorized',
//       element: <UnauthorizedPage />,
//     },

//     // Routes protégées par rôle
//     {
//       path: 'consultant',
//       children: [
//     {
//       path: 'onboarding/welcome',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <WelcomeOnboardingPage />
//         </AuthGuard>
//       ),
//     },
//     {
//       path: 'onboarding/linkedin',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <LinkedInOnboardingPage />
//         </AuthGuard>
//       ),
//     },
//     {
//       path: 'dashboard',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <OnboardingGuard>
//                 <ConsultantDashboard />
//               </OnboardingGuard>
//         </AuthGuard>
//       ),
//     },
//     {
//       path: 'dashboard/create-offer',
//       element: (
//             <AuthGuard requiredRole="consultant">
//           <CreateOfferPage />
//         </AuthGuard>
//       ),
//     },
//     {
//       path: 'dashboard/matching/:id',
//       element: (
//             <AuthGuard requiredRole="consultant">
//           <MatchOfConsultingPage />
//         </AuthGuard>
//       ),
//     },
//     {
//       path: 'dashboard/matching',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <MatchOfConsultingPage />
//             </AuthGuard>
//           ),
//         },
//     {
//       path: 'profile',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <ConsultantProfilePage />
//             </AuthGuard>
//           ),
//         },
//     {
//       path: 'opportunities',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <OnboardingGuard>
//                 <ConsultantOpportunityPage />
//               </OnboardingGuard>
//             </AuthGuard>
//           ),
//         },
//     {
//       path: 'opportunities/:id',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <OnboardingGuard>
//                 <ConsultantOpportunityDetails />
//               </OnboardingGuard>
//             </AuthGuard>
//           ),
//         },
//     {
//       path: 'history',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <OnboardingGuard>
//                 <ConsultantHistoryPage />
//               </OnboardingGuard>
//             </AuthGuard>
//           ),
//         },
//     {
//       path: 'nda/:aoId/:consultantId',
//       element: (
//             <AuthGuard requiredRole="consultant">
//               <SignNDAPage />
//             </AuthGuard>
//           ),
//         },
//       ],
//     },
//     {
//       path: 'commercial',
//       element: (
//         <AuthGuard requiredRole="commercial">
//           <CommercialLayout />
//         </AuthGuard>
//       ),
//       children: [
//         {
//           index: true,
//           element: <Navigate to="/commercial/dashboard" replace />,
//         },
//         {
//           path: 'dashboard',
//           element: <CommercialDashboard />,
//         },
//         {
//           path: 'ao/create',
//           element: <CreateOfferPage />,
//         },
//         {
//           path: 'ao/matching/:id',
//           element: <MatchOfConsultingPage />,
//         },
//         {
//           path: 'ao/matching',
//           element: <MatchOfConsultingPage />,
//         },
//         {
//           path: 'nda',
//           element: <NdaListPage />,
//         },
//         {
//           path: 'candidat',
//           element: <CandidatListPage />,
//         },
//         {
//           path: 'profile',
//           element: <CommercialProfilePage />,
//         },
//       ],
//     },
//     {
//       path: 'admin',
//       element: (
//         <AuthGuard requiredRole="admin">
//           <CommercialLayout />
//         </AuthGuard>
//       ),
//       children: [
//         {
//           index: true,
//           element: <Navigate to="/admin/dashboard" replace />,
//         },
//         {
//           path: 'dashboard',
//           element: <AdminDashboard />,
//         },
//         {
//           path: 'users',
//           element: <AdminUsersPage />,
//         },
//         {
//           path: 'profile',
//           element: <CommercialProfilePage />,
//         },
//       ],
//     },

//     // Routes publiques
//     {
//       path: '/',
//       element: <HomePage />,
//     },

//     // Workaround for incorrect reset password URL
//     {
//       path: '/reset-password',
//       element: <ResetPasswordRedirect />,
//     },

//     // 404
//     {
//       path: '*',
//       element: <NotFoundPage />,
//     },
//   ]);
// }
