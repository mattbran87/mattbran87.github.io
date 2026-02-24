---
layout: post
title: "Effective Prompting for Code Generation"
date: 2026-02-23 11:00:00 -0600
tags: [ai, tools, prompting]
description: "Practical prompting strategies that get better code from AI assistants — specificity, context, and iteration techniques."
series: building-with-ai-tools
series_part: 3
---

The quality of code you get from an AI assistant is directly proportional to the quality of your prompts. Vague instructions produce vague code. Specific, context-rich prompts produce code that's ready to ship.

## The Specificity Principle

Compare these two prompts:

**Vague:** "Add a search feature to my site."

**Specific:** "Add client-side search using Lunr.js. Build the search index at Jekyll build time from post titles, tags, and content. Create a `/search/` page with an input field and results list. Style with Bootstrap and BEM classes matching the existing theme."

The second prompt gives the AI everything it needs: the technology choice, the data source, the output location, and the styling conventions. Less back-and-forth, better results.

## Context Is Everything

AI assistants work best when they understand:

1. **What exists** — the current codebase, patterns, and conventions
2. **What you want** — the specific outcome, not just the general direction
3. **What to avoid** — constraints, anti-patterns, and things you've already tried

The `CLAUDE.md` file handles the first point passively. Your prompts handle the other two actively.

## The Iteration Loop

Even good prompts rarely produce perfect code on the first try. The real skill is in the iteration:

1. **Start broad** — describe the feature at a high level
2. **Review the approach** — check the AI's plan before it writes code
3. **Refine incrementally** — fix issues one at a time rather than re-prompting from scratch
4. **Capture decisions** — document why you chose one approach over another

This series itself was built using exactly this workflow. Each feature started as a spec, went through research and planning, then implementation — with the AI as a collaborator, not an autopilot.

## Common Mistakes

- **Over-prompting:** Including irrelevant details that confuse the model
- **Under-constraining:** Not specifying conventions, leading to inconsistent code
- **Ignoring context:** Not telling the AI about existing code it should integrate with
- **Skipping review:** Accepting generated code without reading it

## Up Next

In the next part, we'll look at real examples of AI-assisted feature development — the wins, the failures, and the lessons learned along the way.
