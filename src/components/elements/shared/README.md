
# Outcome Section Components

This directory contains components related to handling success and failure outcomes for interactive story elements.

## Component Overview

### OutcomeSection

`OutcomeSection.tsx` is the main entry point that serves as a facade for the outcome UI system. It determines which rendering pattern to use based on props and delegates to either:
- `SingleOutcomeSection` for elements that only need success-only or failure-only outcomes
- `DualOutcomeSection` for elements that require both success and failure outcomes

It handles the shared logic for:
- Determining which view to render (single or dual)
- Managing the AI dialog state through the `useOutcomeHandling` hook
- Passing appropriate props to child components

### SingleOutcomeSection

`SingleOutcomeSection.tsx` displays a focused view for either success or failure outcomes. It's used when an element only needs to show one type of outcome. It includes:
- Scene selection
- Transition text editing
- Value changes management
- AI generation buttons (for creating branches or endings)

### DualOutcomeSection

`DualOutcomeSection.tsx` provides a side-by-side view of both success and failure outcomes. It's used when elements need both outcome types, such as QTE elements or dialogue tasks. It includes:
- Parallel scene selectors
- Parallel transition text editors
- Two-column layout for value changes
- AI story generation for both outcomes

### Supporting Components

These components handle specific parts of the outcome UI:

#### SceneSelectSection

`SceneSelectSection.tsx` provides UI for selecting which scene follows after the current element, with options for:
- Normal scene selection
- AI-assisted branching
- AI-assisted ending creation

#### TransitionTextsSection

`TransitionTextsSection.tsx` provides text entry fields for narrative transitions between scenes, adapting its layout based on whether it's in single or dual view mode.

#### ValueChangesCollapsible & ValueChangesSection

These components manage the UI for adding, editing, and removing changes to global values as a result of player actions.

#### OutcomeAiDialog

`OutcomeAiDialog.tsx` is a dialog interface for AI-assisted content generation, providing:
- Prompt entry
- Scene convergence selection (for branches)
- Ending type selection (for endings)

## Hooks

### useOutcomeHandling

`useOutcomeHandling.ts` centralizes the state management for AI dialogs, tracking:
- Dialog open state
- Dialog type (branch or ending)
- Success/failure context
- Button visibility based on scene selection

### useElementOutcomes

`useElementOutcomes.ts` (in the hooks directory) abstracts the data handling logic for element outcomes, providing functions for:
- Updating scene IDs
- Updating transition texts
- Managing value changes

## Component Relationships

```
OutcomeSection
├── SingleOutcomeSection
│   ├── SceneSelectSection
│   ├── TransitionTextsSection
│   └── ValueChangesCollapsible
│       └── ValueChangesSection
├── DualOutcomeSection
│   ├── SceneSelectSection
│   ├── TransitionTextsSection
│   └── ValueChangesCollapsible (x2)
│       └── ValueChangesSection
└── OutcomeAiDialog
    └── AiStoryDialog
```

## Usage Patterns

1. **For QTE and Dialogue Task elements:**
   - Use full `OutcomeSection` with both success and failure outcomes

2. **For elements with single outcomes:**
   - Use `OutcomeSection` with `showSuccessOnly` or `showFailureOnly` props

3. **For direct control over layouts:**
   - Use `SingleOutcomeSection` or `DualOutcomeSection` directly

4. **For AI story generation:**
   - Access through the "AI 写支线" and "AI 写结局" buttons
   - Or through scene selection dropdown

## Flow Control

The typical flow for outcome handling is:
1. Element event triggers success or failure
2. OutcomeSection determines scene transitions
3. Value changes are applied to global state
4. Transition text is displayed
5. Player is moved to the next scene

For AI-assisted generation, the flow is:
1. User requests AI generation (branch or ending)
2. Dialog appears for prompt input
3. Selection of convergence point (for branches) or ending type
4. AI generates content based on inputs
5. New scenes are integrated into the story flow
