# ColorPal

This project was completed as part of a take-home coding challenge for a company I am interviewing with. Through this implementation, I aimed to demonstrate not only technical proficiency, but also deliberate architectural choices and thoughtful attention to user experience.

Specifically, I focused on showcasing my ability to:

- Design a clean, intuitive UI with clear interaction patterns
- Structure a scalable Angular application using modern patterns and best practices
- Manage data flow in a predictable and maintainable way
- Apply reactive programming principles with RxJS (stream creation, transformation, composition, and cleanup)
- Establish sensible state management and UI feedback patterns

Beyond simply meeting functional requirements, my goal was to illustrate how I approach problem-solving: balancing simplicity, maintainability, and extensibility while aligning closely with the provided evaluation criteria.

### Evaluation Criteria

- Keep the application small, focused, and coherent
- Maintain clear component boundaries and separation of concerns
- Properly handle loading, empty, and error states
- Write readable, maintainable, idiomatic Angular and TypeScript
- Apply reasonable styling and layout to create a polished user experience
- Organize code in a clean and understandable directory structure

### Architectural Assumptions & Decisions

- I chose to use NgRx for state management to model predictable, centralized state transitions and explicit data flow. While the application could have been implemented with services alone, NgRx provided clearer separation of concerns and made state mutations more transparent and testable.
- I used PrimeNG alongside Tailwind CSS as a UI foundation. PrimeNG accelerated component-level UI development, while Tailwind allowed for precise layout control and consistent visual refinement without excessive custom CSS.
- To power the color refinement logic, I integrated the [Colormind API](http://colormind.io/api-access/), discovered through the [Free APIs](https://free-apis.github.io/#/) directory. 
- I implemented an Angular HTTP interceptor to simulate backend functionality for retrieving and persisting palettes.

### What's the idea about?

For this assessment, I built an application that provides subtle enhancements to an existing color palette. Rather than completely replacing the original colors, the app makes small adjustments to hue and saturation to generate refined, more visually appealing variations.

Users can update an entire palette or modify individual swatches. The application also supports adding new colors and removing existing ones.

## Running it locally

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1. Please also note that I used Node.js version 20.

```bash
npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. 

## Directory structure (within app)

### Components (Reusable UI Building Blocks)

This directory contains reusable, presentation-focused elements that can support any page or feature. While primarily Angular components, it may also include shared pipes and other UI utilities intended to be used across the application.

The goal here is to isolate composable, framework-level building blocks from route-specific logic.

### Environments

This folder contains environment-specific configuration files used to differentiate local development and production builds. These configurations control values such as API endpoints and feature flags without affecting application logic.

### Pages (Route-Level Components)

This directory contains components that are directly tied to application routes. These serve as feature entry points and orchestrate state, services, and reusable components to compose complete views.

### Providers (Application-Level Services & Configuration)

This folder contains services and dependency providers that support the application globally.

I also keep a centralized configuration file here (e.g., `core-providers`) to register foundational providers. While a larger application might segment providers further by domain or environment, I prefer starting with a consolidated core configuration to maintain clarity and reduce early complexity.

### State (NgRx)

This directory contains all NgRx-related logic, including actions, reducers, selectors, and effects. Centralizing state management ensures predictable data flow and clear separation between UI and business logic.

### Types

This folder contains shared TypeScript interfaces, models, and type definitions. Keeping types centralized promotes consistency across state, services, and components while improving maintainability and discoverability.
