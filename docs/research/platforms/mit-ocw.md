# MIT OpenCourseWare - 6.006 Introduction to Algorithms (ocw.mit.edu) - platform research

## Method
- Tool: REA MCP `capture_browser_scenario` (launch mode, Edge, DOM capture), date 2026-10-24.
- robots.txt: `User-Agent: *` / `Allow: /`; sitemap at `/sitemap.xml`. No bot check, no login.
- Pages: `/robots.txt` and the course page `/courses/6-006-introduction-to-algorithms-spring-2020/`. A Creative Commons licence badge appears in the page DOM; the brief states MIT OCW content is CC BY-NC-SA, so **facts only for a monetised site**.

## Summary and business model
- Free open courseware from MIT (non-profit). Funded by gifts: "Give Now" in the header. A "Download Course" zip is offered for offline use. No ads or paywall seen.
- This course: 6.006 Spring 2020, undergraduate, taught by Prof. Erik Demaine, Dr. Jason Ku and Prof. Justin Solomon, department EECS. Topics tagged Algorithms and Data Structures, Theory of Computation, Mathematics.

## Sitemap / URL patterns
- `/courses/<course-number>-<slug>-<term-year>/` is the course root.
- Sub-pages: `/pages/syllabus/`, `/pages/calendar/`, `/pages/lecture-notes/`, `/pages/quizzes/`, `/pages/practice-problems/`, `/pages/assignments/`, `/pages/resource-index/`, `/video_galleries/lecture-videos/`, `/download`.

## Features and how they work
- Left course menu: Syllabus, Calendar, Lecture Videos, Lecture Notes, Quizzes, Practice Problems, Assignments, Resource Index.
- Course info panel: instructors, department, term, level, topics, and **learning-resource types** (Exam Solutions, Exams, Lecture Notes, Lecture Videos, Problem Set Solutions, Problem Sets) shown as icon chips.
- Course description is collapsed with "Show more / Show less".
- A Resource Index page lists every file and video.

## Content coverage (counts)
- One course: lecture videos, lecture notes, quizzes, practice problems, assignments with solutions (exact counts not on the landing page).

## Design language
- Fonts: Helvetica Light for the course title area; Material Icons and Material Icons Round for UI icons.
- CSS bundles `course_v2.*.css` and `common.*.css` (not captured). Layout: left menu column, content column, right "Course Info" card (colour values not extracted).
- Motion: minimal.

## License / terms
CC BY-NC-SA per the brief (the licence badge is on the page). **NonCommercial: do not reuse lecture content in DSAMaxxing.** Facts and curricula structure only, with no copied prose, problems or solutions.

## Adopt for DSAMaxxing
**P1**
- "Resource types" chips (video, notes, quiz, practice, solutions) on each topic so learners see the study menu at a glance.
- A Resource Index page per path (everything on one scannable list).
**P2**
- Offline download of a path as a paid perk.
