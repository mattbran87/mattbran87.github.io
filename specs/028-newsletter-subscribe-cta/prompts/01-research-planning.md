# Prompt: Research & Planning

Read the feature spec at `specs/028-newsletter-subscribe-cta/spec.md` and all supporting documents in that directory. Also read `docs/lessons-learned.md` for known pitfalls and patterns relevant to this feature.

This phase has two stages separated by a **mandatory conversation checkpoint**. Complete Research first, then stop for discussion before moving to Planning.

---

## Stage 1: Research

### Objectives

1. Research the requirements and identify the best approach
2. Document findings in `notes.md` under the Research & Planning section
3. Identify open questions and flag them for discussion
4. If there are multiple valid approaches, document them in `decisions.md` with pros/cons and a recommendation

### Constraints

- Do NOT write any implementation code during this phase
- Do NOT break down tasks or create a plan yet — that happens in Stage 2
- Focus on understanding and research only

### Research Deliverables

- [ ] Completed research section in `notes.md`
- [ ] Open questions identified and listed
- [ ] Approaches and tradeoffs documented in `decisions.md`

### When Research Is Done — STOP

**Do not proceed to planning.** Present the following to the user in a conversation:

1. **What you found** — summarize the research findings, key constraints discovered, and any surprises
2. **What you suggest we build** — your recommended approach and why, including alternatives considered
3. **How we build it** — high-level implementation strategy (architecture, files affected, dependencies)
4. **Open questions** — anything that still needs the user's input or decision

Wait for the user to discuss, ask questions, and confirm the direction before proceeding. The user may adjust the approach, add constraints, or change priorities. **Planning cannot begin until the user explicitly approves moving forward.**

---

## Stage 2: Planning

Only begin this stage after the Research Discussion is complete and the user has approved the direction.

### Objectives

1. Record any decisions from the discussion in `decisions.md`
2. Break down the implementation into concrete tasks in `tasks.md` (Phase 2 section)
3. Update `checklist.md` as items are completed
4. Update Phase History in `spec.md`

### Session Handoff (mandatory)

Update the **Last Session** block at the top of `tasks.md`:
- **When starting each task** — record the date, task number, and what you're about to do
- **When ending a session** — record where you stopped, relevant context, and what the next session should do first

### Planning Deliverables

- [ ] Decisions from discussion recorded in `decisions.md`
- [ ] Tasks broken down in `tasks.md`
- [ ] Research & Planning items checked off in `checklist.md`
- [ ] Last Session block updated in `tasks.md`
- [ ] Phase History updated in `spec.md`

### When Done

Update the Last Session block with final status. Summarize the task breakdown for final review before moving to Implementation.
