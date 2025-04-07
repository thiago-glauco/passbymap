GeoPlaces Dashboard
===================

A modern geospatial dashboard built with:

- React + TypeScript
- Zustand (State Management)
- Material UI
- React Query
- Virtuoso (Virtualized Tables)
- Vercel Ready

Features
--------

🗺️ Interactive Dashboard
- Map View with Geolocation Data  
- Responsive Grid & List Views  
- Virtualized Table for performance with large datasets  

📊 Data Handling
- Filters & Sorting  
- Column selection (optional, coming soon)  
- State managed with Zustand  

💾 Data Layer
- Data fetching isolated in hooks  
- Ready for API integration  
- Offline mode using local mock data  

Project Structure
-----------------

src/
├── components/    -> UI Components (Table, MapView, Filters)
├── hooks/         -> Custom React Hooks
├── services/      -> API & Data Fetching
├── stores/        -> Zustand Global State
├── utils/         -> Pure Functions (filters, sorters)
├── types/         -> TypeScript Types
└── pages/         -> Next.js Routes

Getting Started
---------------

1. Clone the Repo:
------------------

git clone https://github.com/your-username/geoplaces-dashboard.git
cd geoplaces-dashboard

2. Install Dependencies:
------------------------

npm install --legacy-peer-deps

3. Run Locally:
---------------

npm run dev

App will run at:  
http://localhost:5173/

Deployment
----------

Recommended: Vercel  
https://vercel.com/

vercel login  
vercel  

Tech Stack
----------

React + TS       -> Strong typing, better DX  
Zustand          -> Clean, scalable global state  
React Query      -> Data fetching & caching  
Material UI      -> Consistent UI Design  
Virtuoso         -> Performance with large lists  
Vercel           -> Instant deployment & preview URLs  

Contribution Guide
------------------

1. Fork the repo  
2. Create feature branch: feat/my-feature  
3. Commit & Push  
4. Open PR  

Author
------

Thiago Glauco Sanchez

Future Improvements
-------------------

- Column selection (show/hide)  
- User authentication  
- Real API Integration  
- Analytics Dashboard  
- Admin Panel  
