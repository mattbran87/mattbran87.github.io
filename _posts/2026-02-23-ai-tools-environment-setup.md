---
layout: post
title: "Setting Up Your AI Development Environment"
date: 2026-02-23 10:00:00 -0600
tags: [ai, tools, setup]
description: "How to configure your editor, terminal, and AI assistant for a productive AI-assisted development workflow."
series: building-with-ai-tools
series_part: 2
---

Before you can get the most out of an AI coding assistant, your environment needs to be set up to support the workflow. This isn't just about installing a plugin — it's about creating a context-rich workspace that helps the AI help you.

## Editor Configuration

Your editor is where you'll spend most of your time, so it needs to play well with your AI assistant.

**VS Code** is the most common choice, and for good reason — it has first-class extensions for most AI tools. Here's what matters:

- Install the AI assistant's extension (Copilot, Cody, etc.)
- Keep your workspace focused — open only the project you're working on
- Use a `.editorconfig` file to standardize formatting

## Terminal Setup

If you're using a CLI-based assistant like Claude Code, your terminal matters:

- Use a terminal with good Unicode support
- Set up a comfortable shell (bash, zsh, or fish)
- Consider a terminal multiplexer like tmux for session management

## Project Context

The single most impactful thing you can do is give your AI assistant context about your project. A `CLAUDE.md` (or equivalent) file at the project root acts as a persistent briefing document:

```markdown
# Project Overview
Jekyll blog using Bootstrap 5 and Minima theme.

# Commands
bundle exec jekyll serve --livereload

# Conventions
- BEM naming for CSS
- 4 spaces indentation
- Semantic HTML
```

This file is read automatically and shapes every interaction. It's the difference between the AI guessing at your conventions and knowing them.

## What's Next

With your environment ready, the next step is learning how to write effective prompts that get you useful code on the first try. That's where things get interesting.
