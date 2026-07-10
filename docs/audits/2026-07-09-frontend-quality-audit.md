# Frontend Quality Audit

Project: JB PROFILE WEBSHOWCASE
Date: 2026-07-09

Audit inputs:
- `npx impeccable detect` on `src/`
- `npm run build`
- `npx tsc --noEmit`
- Live render sanity check on `http://www.jonoblackburn.com/`

## Anti-Patterns Verdict

Pass/Fail: **Fail**.

This is not a broken interface, but it does carry several clear AI-era fingerprints. The strongest tells are the repeated use of overused display fonts, the cyan/emerald/gold-on-deep-navy palette, the pervasive glass morphism and backdrop blur treatment, and the repeated orb + card-grid composition language across different pages. The result feels polished, but also highly template-derived.

Specific tells:
- Overused font stack with repeated `Fraunces` usage in the global type system. See [src/styles/globals.css](../../src/styles/globals.css#L40) and repeated declarations around [L102](../../src/styles/globals.css#L102), [L109](../../src/styles/globals.css#L109), [L116](../../src/styles/globals.css#L116).
- Heavy neon-dark palette and glow accents across the global system. See [src/styles/globals.css](../../src/styles/globals.css#L18-L26) and [src/styles/globals.css](../../src/styles/globals.css#L42-L45).
- Glass morphism applied as a default language rather than a selective treatment. See [src/styles/globals.css](../../src/styles/globals.css#L356-L390), [src/styles/globals.css](../../src/styles/globals.css#L596-L684), and [src/styles/globals.css](../../src/styles/globals.css#L1518-L1520).
- Repeated decorative orbs and dark gradient layers on multiple pages. See [src/components/boot/BootSequence.tsx](../../src/components/boot/BootSequence.tsx#L24-L58), [src/pages/PublicHome.tsx](../../src/pages/PublicHome.tsx#L208-L216), and [src/pages/RequestAccess.tsx](../../src/pages/RequestAccess.tsx#L68-L76).

## Executive Summary

- Total issues found: **6**
- Critical: **0**
- High: **2**
- Medium: **3**
- Low: **1**
- Overall quality score: **64/100**

Top issues:
1. The type system leans on overused, widely seen fonts, which weakens brand distinctiveness.
2. The visual system is dominated by the same glassy dark-tech language on nearly every panel, which makes the UI feel templated.
3. `npx tsc --noEmit` currently fails in `PublicNav.tsx`, which means the codebase is not type-clean even though the production build passes.

Recommended next step:
- Use `/normalize` first to reduce the visual template feel and tighten the design system.
- Use `/optimize` next for route splitting and bundle reduction.
- Use `/harden` after that to clean up the remaining semantic and type issues.

## Detailed Findings

### High Severity

#### 1. Overused font stack makes the brand feel generic
- Location: [src/styles/globals.css](../../src/styles/globals.css#L40), [src/styles/globals.css](../../src/styles/globals.css#L102), [src/styles/globals.css](../../src/styles/globals.css#L109), [src/styles/globals.css](../../src/styles/globals.css#L116), plus repeated usage throughout the file.
- Severity: High
- Category: Theming / Anti-pattern
- Description: The root typography relies on `Manrope` and repeatedly uses `Fraunces`. Both are common enough that they do not create a strong proprietary voice here, especially when reused across headings and hero copy.
- Impact: The UI reads as competent but less memorable. Typography is one of the first signals people use to judge originality, and this stack nudges the site toward the common 2024-2025 AI-generated landing-page look.
- WCAG/Standard: Not a direct WCAG violation, but it weakens brand differentiation and content hierarchy.
- Recommendation: Swap in a more distinctive display/body pairing and reduce repeated display-face reuse. Keep one voice for headlines and a different, calmer body face.
- Suggested command: `/normalize`

#### 2. Glassy neon-dark treatment is overused as a default visual language
- Location: [src/styles/globals.css](../../src/styles/globals.css#L13-L26), [src/styles/globals.css](../../src/styles/globals.css#L356-L390), [src/styles/globals.css](../../src/styles/globals.css#L596-L684), [src/styles/globals.css](../../src/styles/globals.css#L995-L995), [src/styles/globals.css](../../src/styles/globals.css#L1518-L1520), [src/styles/globals.css](../../src/styles/globals.css#L2260-L2260)
- Severity: High
- Category: Theming / Anti-pattern
- Description: The design system relies heavily on backdrop blur, layered gradients, glowing borders, and dark translucent panels. It is cohesive, but the pattern is so pervasive that it starts to feel like a stock “premium dashboard” template.
- Impact: Users get visual sameness across sections, which reduces hierarchy and makes important content harder to distinguish from decorative shell treatment.
- WCAG/Standard: Not a direct violation by itself, but the treatment can contribute to weaker perceptual hierarchy and contrast risk on some surfaces.
- Recommendation: Reserve blur/glow treatments for a small number of focal shells and flatten the rest. Introduce one or two non-glassy surfaces so the visual system has contrast, not just color contrast.
- Suggested command: `/normalize`

### Medium Severity

#### 3. Repeated orb decoration and grid-card composition feels templated
- Location: [src/components/boot/BootSequence.tsx](../../src/components/boot/BootSequence.tsx#L24-L58), [src/pages/PublicHome.tsx](../../src/pages/PublicHome.tsx#L208-L216), [src/pages/RequestAccess.tsx](../../src/pages/RequestAccess.tsx#L68-L76), [src/components/public/SupportWorkStrip.tsx](../../src/components/public/SupportWorkStrip.tsx#L104-L123)
- Severity: Medium
- Category: Responsive / Anti-pattern
- Description: Similar orb backgrounds, rounded cards, and repeated grid layouts appear across multiple experiences. The site is well structured, but too many sections share the same silhouette and spatial rhythm.
- Impact: Users experience visual fatigue and the product loses moments of emphasis. Important content blends into the same repeated presentation layer.
- WCAG/Standard: No direct violation, but the pattern reduces clarity and scanability.
- Recommendation: Vary compositions by section. Use fewer floating decorative elements, alternate dense and open layouts, and avoid making every section a card wall.
- Suggested command: `/normalize`

#### 4. Initial bundle is large and the route tree is eager-loaded
- Location: [src/app/routes.tsx](../../src/app/routes.tsx#L1-L14), [src/app/App.tsx](../../src/app/App.tsx#L1-L11), and the production build output from `npm run build`
- Severity: Medium
- Category: Performance
- Description: Routes import page modules eagerly, and the production build ships a roughly 409 KB raw JavaScript bundle before gzip. The app works, but first-load cost is high for a marketing-style site.
- Impact: Slower initial rendering on mobile and weaker perceived responsiveness, especially on lower-end devices or constrained networks.
- WCAG/Standard: Not a direct WCAG issue, but it affects Core Web Vitals and real-world usability.
- Recommendation: Use route-level code splitting and lazy-load the heavier public/private surfaces. Split the heaviest sections out of the landing route.
- Suggested command: `/optimize`

#### 5. Public navigation lacks a stronger semantic state signal
- Location: [src/components/navigation/PublicNav.tsx](../../src/components/navigation/PublicNav.tsx#L100-L124)
- Severity: Medium
- Category: Accessibility
- Description: The navigation is rendered as a button cluster with visual active styling, but it is not exposed as a semantic navigation landmark and the active section is not surfaced with a semantic state such as `aria-current`.
- Impact: Screen reader and keyboard users can use it, but they do not get the same clarity about which section is currently active. The interaction is functional, but not fully self-describing.
- WCAG/Standard: Related to WCAG 1.3.1 and 4.1.2.
- Recommendation: Wrap the control group in a `nav` landmark, expose the active item with a semantic state, and consider anchor-based section targets where practical.
- Suggested command: `/harden`

#### 6. Type checking fails in `PublicNav.tsx`
- Location: [src/components/navigation/PublicNav.tsx](../../src/components/navigation/PublicNav.tsx#L31-L90)
- Severity: Medium
- Category: Stability / Code health
- Description: `npx tsc --noEmit` fails on `window.addEventListener('scroll', ...)` with `Property 'addEventListener' does not exist on type 'never'`.
- Impact: The production build still succeeds, but the type checker is no longer clean. That weakens confidence in future refactors and can hide related regressions.
- WCAG/Standard: Not applicable.
- Recommendation: Clean up the `window` typing path and re-run type checking as part of the normal CI gate.
- Suggested command: `/harden`

### Low Severity

#### 7. Inline theme colors bypass the token system in a few places
- Location: [src/components/public/SupportWorkStrip.tsx](../../src/components/public/SupportWorkStrip.tsx#L111-L123)
- Severity: Low
- Category: Theming
- Description: Some support-card colors are hard-coded inline rather than being expressed through tokens or shared utility classes.
- Impact: The drift is minor, but it weakens theme consistency and makes future palette changes harder.
- WCAG/Standard: Not a violation on its own.
- Recommendation: Move the remaining hard-coded values into tokens or shared classes when doing the next visual cleanup pass.
- Suggested command: `/normalize`

## Patterns & Systemic Issues

- The global visual language is heavily biased toward the same premium-dark-glass treatment. This is the dominant pattern behind the “AI slop” verdict.
- Hero, boot, and support sections all use similar glowing orbs and layered gradients, which makes the site feel procedurally composed rather than deliberately art-directed.
- The site has strong semantic coverage in many places, but the navigation and type-checking layer still need hardening.
- The app is visually ambitious, but the bundle size shows the cost of shipping the whole experience eagerly.

## Positive Findings

- Most interactive controls already have labels or accessible names. Examples include the nav buttons, support links, and OS launcher actions.
- Image alt text is present in the core public surfaces, including hero and editorial imagery.
- Reduced-motion handling is already implemented in key motion components such as `PremiumButton`, `GlassPanel`, and `BootSequence`.
- The production build passes successfully, which means the current codebase is at least structurally shippable.

## Recommendations by Priority

1. Immediate: Reduce the visual-template feel by changing typography and dialing back repeated glass/orb styling.
2. Short-term: Lazy-load the heavier public/private surfaces and split the landing route.
3. Medium-term: Tighten semantic navigation and clean up the `PublicNav` TypeScript failure.
4. Long-term: Establish a narrower design system with fewer reusable decorative defaults so future pages do not converge on the same look.

## Suggested Commands for Fixes

- Use `/normalize` to align the interface with a more distinctive and less templated design language.
- Use `/optimize` to reduce the initial JS cost and improve loading performance.
- Use `/harden` to improve semantics, keyboard clarity, and type-checking stability.
