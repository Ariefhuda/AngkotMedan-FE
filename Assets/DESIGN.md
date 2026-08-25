---
name: Medan Transit System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cadaff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8edff'
  surface-container-high: '#e0e8ff'
  surface-container-highest: '#d7e2ff'
  on-surface: '#041b3c'
  on-surface-variant: '#504533'
  inverse-surface: '#1d3052'
  inverse-on-surface: '#edf0ff'
  outline: '#837560'
  outline-variant: '#d5c4ac'
  surface-tint: '#7c5800'
  primary: '#7c5800'
  on-primary: '#ffffff'
  primary-container: '#fdb813'
  on-primary-container: '#6b4b00'
  inverse-primary: '#ffbb1e'
  secondary: '#0453cd'
  on-secondary: '#ffffff'
  secondary-container: '#356ee7'
  on-secondary-container: '#fefcff'
  tertiary: '#5c5f60'
  on-tertiary: '#ffffff'
  tertiary-container: '#c3c4c5'
  on-tertiary-container: '#4f5152'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea7'
  primary-fixed-dim: '#ffbb1e'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#dae2ff'
  secondary-fixed-dim: '#b2c5ff'
  on-secondary-fixed: '#001848'
  on-secondary-fixed-variant: '#0040a2'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#041b3c'
  surface-variant: '#d7e2ff'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width-content: 1200px
---

## Brand & Style

The design system is built for the dynamic urban environment of Medan, balancing the vibrant energy of its transit culture with the rigorous reliability required for public infrastructure. The aesthetic direction is **Corporate / Modern** with a focus on high legibility and efficiency. 

The system prioritizes a "Map-First" user experience, utilizing clean whitespace and a structured card-based architecture to organize complex routing information. The interface evokes a sense of civic pride and technological advancement, transforming the traditional "Angkot" experience into a streamlined, predictable digital service. The emotional response is one of confidence, ease of use, and local relevance.

## Colors

The palette is rooted in the iconic visual identity of Medan's streets. 
- **Primary (Angkot Gold):** A vibrant yellow-orange used for primary actions, branding, and highlighting transport modes. It ensures high visibility against map layers.
- **Secondary (Trust Blue):** A deep, professional blue used for navigation, structural elements, and transit routes to establish authority and reliability.
- **Surface & Background:** A range of cool greys and whites provide a clean, modern backdrop that prevents cognitive overload.
- **Semantic Colors:** Success green and alert red are reserved strictly for route status (e.g., "On Time" vs. "Delayed") and safety information.

## Typography

This design system employs a dual-font strategy to maximize both character and clarity. 

**Montserrat** is used for headings and brand moments. Its geometric construction feels modern and architectural, perfect for a transit system. **Inter** is the workhorse for all functional data, route lists, and map labels. Its high x-height and systematic design ensure that even small street names or ETAs are legible in outdoor lighting conditions. 

Weight is used strategically to create hierarchy: bold weights are reserved for station names and arrival times, while regular weights handle secondary descriptive text.

## Layout & Spacing

The system uses a **Fluid Grid** model with a 4px baseline rhythm. 

- **Mobile:** A single-column layout where the map serves as the bottom layer and interface elements (search, route cards) exist as floating sheets or drawers.
- **Desktop:** A split-view layout. The left sidebar (360px - 420px) contains the search and route results, while the map occupies the remaining fluid width.
- **Touch Targets:** All interactive elements must maintain a minimum 44x44px hit area to accommodate use while commuting or walking.
- **Padding:** Route cards use 16px (md) internal padding to ensure data density without feeling cramped.

## Elevation & Depth

Hierarchy is established using **Tonal Layers** combined with **Ambient Shadows**. 

1. **Level 0 (Base):** The map layer.
2. **Level 1 (Surface):** Floating search bars and inactive route cards. These use a very soft, diffused shadow (0px 4px 12px rgba(0,0,0,0.05)) to appear distinct from the map.
3. **Level 2 (Active/Lifted):** Selected route cards or bottom sheets. These use a more pronounced shadow (0px 8px 24px rgba(0,0,0,0.1)) to indicate focus.
4. **Level 3 (Overlays):** Modals and alerts.

Containers use subtle 1px borders in a light grey tint to define boundaries in high-glare environments where shadows might wash out.

## Shapes

The design system utilizes **Rounded** geometry (8px / 0.5rem base) to soften the "industrial" nature of transit data. 

- **Buttons & Inputs:** Use the standard `rounded` (8px) for a modern, approachable feel.
- **Route Cards:** Use `rounded-lg` (16px) to create a distinct containerized look.
- **Transport Icons/Badges:** Use `rounded-xl` or full pill shapes to distinguish them from structural UI elements.
- **Bottom Sheets:** Use `rounded-xl` (24px) specifically on the top-left and top-right corners to emphasize the "sliding up" metaphor.

## Components

### Buttons
- **Primary:** Solid "Angkot Gold" with "Neutral" text. High contrast for critical actions like "Start Route."
- **Secondary:** Outlined Blue or Light Grey background for "Save" or "Share" actions.

### Cards (Route & Station)
- White background with Level 1 elevation.
- Must include a vertical "Route Line" indicator using the secondary or semantic color.
- Use `label-bold` for ETA and `headline-sm` for destination names.

### Transit Chips
- Small, pill-shaped badges representing different modes (Angkot, Bus, Train). 
- Color-coded: Yellow for Angkot, Blue for Bus, Green for Train.

### Input Fields
- Floating labels with 16px horizontal padding.
- Search inputs should include a leading icon (magnifying glass) and a trailing "Clear" button.

### Progress & Status
- **Live Indicator:** A pulsing Success Green dot next to arrival times to indicate real-time GPS data.
- **Warning Banners:** Error Red background with white text, positioned at the top of the route list for service disruptions.

### Map Pins
- Custom pins with transport mode icons. Active pins should "grow" in size and add Level 2 elevation shadows.