# Wellbeing-Inc.

How to run:
1. Clone newest version of main
2. Open terminal, and make sure you are in 'wellbeinginc' folder (cd wellbeinginc)
3. Run 'npm install'
4. Create a new file in 'wellbeinginc' called '.env.local' and paste:
    NEXT_PUBLIC_SUPABASE_URL=https://nwysqtnfikxauolsknzt.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko
5. Create a new file in 'wellbeinginc' called 'next-env.d.ts' and paste (include ///):
    /// <reference types="next" />
    /// <reference types="next/image-types/global" />
6. Run 'npm run dev'


Only focus on 'app' and 'components' folders, ignore rest. Each folder in 'app' is a page, modify the page.tsx to modify the page. Page.tsx should be basic and call components.
Pages to do:
- login                   Dayo , CSS done
- articles                Sana
- changePlan              Melek
- contact                 Rafay
- diary
- diaryEntry
- healthTracker
- home (now called protected)  Newton & Vivek
- plan                    Melek
- planCreate              Melek
- profile                 Melek
- landing                 Melek

- Supabase                Dayo and Ion

We have a premade login page with authentication, CSS needs to be modified to match theme. Don't change code.

Componens are simple parts of the page for easier creation/modification. If component is multiple words (e.g HomeArticle) first word is what page the component relates to (exeptions: PlanTemplate which is smaller version of plan that can appear when you choose the plan or main page). Single word components appear on multiple pages.
Components to do:
- Activity
- ArticlesArticle - layout done
- ChangePlanCustom
- ChangeFilter
- ChangePlanPremade
- ContactChampions - layout done
- ContactFeedback - layout done, linked to Supabase
- DiaryCalendar - layout done, has compile issues
- DiaryEntry - layout done
- Header
- HomeArticle - layout done but not connected to DB
- HomePlan
- HomeProfile - layout done
- Menu
- Navbar - layout done
- PlanPlan
- PlanTemplate
- FeedbackLog
These pages/componets are only a start, everything can be modified. If any page/component doesn't make sense, ask.

Usefull webstes:
Next.js - https://nextjs.org/docs/app/building-your-application/routing
Supabase - https://supabase.com/docs/guides/getting-started
Typescript - https://react.dev/learn/typescript
React - https://legacy.reactjs.org/tutorial/tutorial.html
HTML - https://www.w3schools.com/html/
Tailwind CSS - https://tailwindcss.com/docs/installation


- Fix CSS for all
- Create Account - redirect to health tracker for first entry
- Home page - home article and chatbot button design done but button does nothing ( home page mostly done)
- Plan - connect to db
- Diary connect to db, new entry button
- Health tracker - combine with diary
- Articles - connect to db
- Chatbot

Usecases:
    Login/out
    Tracker (Diary)
    Edit profile
    Edit article
    Switch plan
    Feedback
    Chatbot

Still To Claim:

-Switch Plan CSS (Newton)
-Linking Plan to Supabase database tables (incl.menu) - Ion
-Hardcoding Menus into datatbase
-Hardcoding Food Items into database
-Linking all related menu tables together
-Custom Plans - Ion
-Downloading Plan
-Basically, everything to do with Plan-

-Creating Profile upon Account Creation (Melek)
-Linking user profile to homepage component (Melek)
-Edit profile CSS pop up on homepage(Melek)
-Linking Edit Profile to db(Dayo)

-Healthtracker component & Page removal- Vivek
