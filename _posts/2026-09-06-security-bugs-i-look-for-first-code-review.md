---
title: "The Security Bugs I Look for First When Reviewing a Codebase"
date: 2026-09-06 12:11:00 +0700
categories: [Application Security, Secure Code Review]
tags: [appsec, source-code-review, authorization, trust-boundaries, web-security, api-security, security-consulting]
description: "When I review an unfamiliar codebase, I prioritize broken authorization, trust-boundary failures, alternate interfaces, sensitive state transitions, and data-lifecycle mistakes before chasing isolated dangerous functions."
permalink: /posts/security-bugs-i-look-for-first-when-reviewing-a-codebase/
---

# The Security Bugs I Look for First When Reviewing a Codebase

When I open an unfamiliar codebase, I do **not** start by searching for every dangerous function.

I start by asking a different question:

> **Where does this application make a security decision, and what happens if that decision is incomplete?**

That distinction matters.

A codebase can use nonces, authentication middleware, input validation, framework security APIs, and escaping helpers and still contain a serious vulnerability. The individual checks may all be real. The problem is often that they protect the wrong boundary, validate only part of the state transition, or assume that one interface enforces a rule that another interface quietly bypasses.

That is why my first pass through a codebase is usually about **trust boundaries, authorization, object relationships, and security-sensitive state changes**.

The goal is not to produce the longest list of suspicious functions.

The goal is to find the places where the software's **intended security model and implemented security model diverge**.

---

## 1. Authorization Exists — But It Is Not Object-Specific

One of the first patterns I look for is code that verifies *something* about the current user but never proves that the user is authorized to act on the specific object supplied in the request.

A common shape looks like this:

~~~text
authenticated user
    ↓
valid request token / nonce / session
    ↓
attacker-controlled object ID
    ↓
sensitive operation
~~~

The presence of authentication can make this code look safe during a quick review.

But authentication answers:

~~~text
Who is making this request?
~~~

Object-level authorization answers:

~~~text
May this user perform this action on this object?
~~~

Those are different questions.

I have encountered this pattern repeatedly in public vulnerability research.

In [CVE-2026-14224](/posts/cve-2026-14224-easy-appointments-idor-notification-redirection/), a valid appointment-edit workflow did not adequately bind the authorization decision to the appointment being targeted.

In [CVE-2026-15248](/posts/cve-2026-15248-meta-box-arbitrary-attachment-deletion/), request-controlled object and attachment identifiers reached a deletion workflow without sufficient object-level authorization.

And in [CVE-2026-15231](/posts/cve-2026-15231-taxopress-ai-preview-private-post-disclosure/), a user could reference a post they were not authorized to read and receive output derived from it.

Different features. Different consequences.

The recurring review question is the same:

> **Where is the actor-to-object relationship actually enforced?**

If I cannot find that decision, the path deserves deeper review.

---

## 2. Alternate Interfaces That Do Not Preserve the Primary Security Model

A security rule is only as strong as the weakest interface that exposes the protected resource.

Applications frequently protect the obvious path correctly:

~~~text
product page
profile page
admin screen
document view
primary API route
~~~

Then expose the same underlying object through:

~~~text
autocomplete
search
export
preview
background jobs
mobile API
AJAX
GraphQL
webhooks
internal helper endpoints
~~~

Those secondary interfaces are valuable review targets because developers often assume the original access rule will somehow carry over automatically.

It may not.

In [CVE-2026-16612](/posts/cve-2026-16612-fibosearch-password-protected-product-enumeration/), the normal WooCommerce product page still respected the password gate. The issue appeared in the autocomplete layer, which returned a password-protected product to a user who had not satisfied that gate.

That is the kind of mismatch I actively look for:

~~~text
Primary interface:
security rule enforced

Secondary interface:
same object
different code path
different decision
~~~

For a code review, I therefore map **all interfaces that can read, mutate, derive, export, preview, or delete the same sensitive object**.

The interesting bugs are often in the second or third way of reaching the data.

---

## 3. Security Checks That Answer the Wrong Question

Security-sensitive code often contains checks that are individually correct but insufficient for the operation being performed.

Examples include:

~~~text
valid nonce
valid CSRF token
authenticated session
correct role
valid signature format
known object ID
sanitized input
~~~

Each of those checks can be useful.

None of them automatically proves that the entire operation is authorized.

A valid nonce may prove that a request came from a legitimate workflow, but not that the caller owns the object referenced in that request.

A role check may prove that a user is an editor, but not that they are allowed to modify another tenant's resource.

Input sanitization may make data syntactically safe while leaving a business-logic authorization failure untouched.

During source review, I therefore translate every guard into a plain-English statement:

~~~text
This check proves ______.
~~~

Then I compare that statement with what the operation actually requires.

If the operation requires:

~~~text
User A may modify only objects belonging to User A.
~~~

but the implemented check proves only:

~~~text
User A is authenticated.
~~~

the security model is incomplete.

This sounds simple, but it is one of the most productive ways I know to review application code.

---

## 4. Security-Sensitive State Transitions

Read-only endpoints matter, but state transitions often produce the highest-value review paths.

I prioritize operations such as:

- changing ownership
- changing an email address
- changing notification destinations
- deleting files or records
- promoting roles
- resetting credentials
- approving or publishing content
- modifying billing state
- processing external callbacks
- creating exports
- changing tenant or project membership

The question is not merely whether the endpoint is protected.

The question is whether **every condition required for that transition is validated before the state changes**.

A useful mental model is:

~~~text
actor
  ↓
entry point
  ↓
attacker-controlled parameters
  ↓
security guards
  ↓
state transition
  ↓
persistent consequence
~~~

The closer a path gets to a persistent or privileged state change, the more carefully I review the actor, target object, previous state, intended new state, and cross-user or cross-tenant consequences.

This is also why I prefer evidence-driven validation over identifying a suspicious line and immediately calling it a vulnerability.

The state transition has to be reachable, the security condition has to be missing or bypassed, and the consequence has to be demonstrated.

---

## 5. Files and Data That Outlive Their Intended Lifecycle

Some vulnerabilities are not caused by a missing authorization check at the request boundary.

They appear because sensitive data is created correctly, used correctly, and then **left somewhere it was never supposed to remain**.

Temporary files are a classic example.

Other examples include:

- generated reports
- CSV exports
- cached responses
- debug artifacts
- preview files
- email attachments
- backup archives
- transformed uploads
- temporary download objects

In [CVE-2026-11571](/posts/cve-2026-11571-everest-forms-sensitive-information-exposure/), the interesting boundary was the lifecycle of generated CSV submission data. Under a particular notification workflow, a generated artifact could remain in a publicly accessible location after its intended email use.

This is why file review is not just:

~~~text
Can an attacker upload a dangerous file?
~~~

It is also:

~~~text
Who creates this file?
What data does it contain?
Where is it stored?
Who can retrieve it?
When is it deleted?
What happens on partial failure?
What happens when multiple workflow branches execute?
~~~

Lifecycle bugs are easy to miss because the vulnerable condition may exist **between components**, rather than inside one obviously dangerous function.

---

## 6. External Trust Boundaries: Webhooks, Callbacks, Queues, and Integrations

Whenever an application accepts data that *claims* to originate from another trusted system, I review how that trust is established.

Typical boundaries include:

- payment webhooks
- OAuth callbacks
- internal service callbacks
- message queues
- import pipelines
- CI/CD events
- signed download requests
- synchronization jobs
- third-party API metadata

The important question is:

> **What makes this message trusted?**

Not:

> **Does this request look like the expected format?**

Those are different.

A webhook body can be perfectly valid JSON and still be attacker-controlled.

A callback can contain all expected fields and still lack provenance.

A background job may run with elevated privileges even though the data that created the job originated from a lower-trust actor.

In [CVE-2026-11855](/posts/cve-2026-11855-simple-membership-stored-xss/), the vulnerability chain crossed multiple boundaries: externally supplied webhook metadata was accepted under an unsafe trust condition, persisted, and later reached an administrator-facing rendering context.

That is exactly why I trace security-relevant data **across components**, not only within the function where it first enters the application.

---

## 7. Cross-Tenant and Cross-User Assumptions Hidden in Helper Functions

One reason authorization bugs survive code review is that the sensitive operation may be several function calls away from the entry point.

The route looks clean.

The controller looks clean.

The helper looks reusable.

The database function does exactly what its name promises.

But somewhere in that chain, an object ID has changed from:

~~~text
trusted object belonging to current user
~~~

into:

~~~text
arbitrary object supplied by request
~~~

without anyone noticing.

So when I trace a security-sensitive path, I keep the principal and the object visible throughout the call chain:

~~~text
principal
    +
target object
    +
requested action
    +
required relationship
~~~

For multi-user and multi-tenant systems, that relationship is often the real security boundary.

Framework abstractions do not remove it.

They can only make it easier to forget.

---

## My First-Pass Review Model

When I need to understand a new attack surface quickly, I reduce the path to six questions:

~~~text
1. ACTOR
   Who can reach this code?

2. ENTRY
   Which route, handler, callback, job, or message starts the flow?

3. CONTROL
   Which values can the actor influence?

4. GUARD
   What does each security check actually prove?

5. TARGET / SINK
   Which object, state, file, query, or privileged operation is reached?

6. NEGATIVE CONTROL
   What should fail if the security boundary is working correctly?
~~~

The last question is especially important.

A successful request proves that something works.

A useful negative control proves that the **boundary** works.

For authorization testing, I want to compare cases such as:

~~~text
own object     → allowed
foreign object → denied
~~~

For visibility rules:

~~~text
permitted resource  → returned
restricted resource → withheld
~~~

For external trust:

~~~text
valid trusted message → processed
untrusted equivalent  → rejected
~~~

That contrast helps distinguish exploitable security failures from code that merely looks unusual.

---

## What I Do Not Optimize For

I do not judge a code review by how many findings it produces.

A report containing twenty weak observations can be less valuable than one well-supported issue involving a real trust-boundary failure.

I would rather deliver:

~~~text
one reachable path
+ one clearly missing security decision
+ reproducible evidence
+ practical remediation
~~~

than inflate a report with scanner noise, theoretical edge cases, or severity claims that the evidence does not support.

For engineering teams, the useful output is not:

> "This function looks dangerous."

It is:

> "This actor can reach this operation, this required security condition is missing, this is the resulting consequence, and this is where the boundary should be enforced."

That is the standard I try to apply to my public vulnerability research and to focused security review work.

---

## When I Would Prioritize a Source-Code Security Review

Source review is particularly useful when a product is introducing or changing security-sensitive architecture, for example:

- a new authentication or authorization model
- multi-tenant functionality
- administrative APIs
- file upload, export, or document workflows
- payment or webhook integrations
- user-generated content pipelines
- major privilege or role changes
- a large security-sensitive refactor
- remediation after a vulnerability disclosure
- an enterprise launch where customers will scrutinize security controls

A black-box test shows what can be observed from outside.

Source review adds another perspective:

> **Where is the application assuming a security property that the code does not actually enforce?**

That is often where the most interesting review paths begin.

---

## Security Review

My public [Security Research](/research/) contains the underlying vulnerability write-ups referenced above.

For software teams that need a focused assessment, I provide [Secure Source-Code Review and Application Security services](/services/) centered on authorization, trust boundaries, data flow, sensitive state transitions, and practical exploitability validation.

If you have a repository, feature, or security-sensitive workflow that needs review, you can [contact me here](/contact/).

---

*All security research and testing described on this site is conducted in authorized environments, local labs, client-approved scopes, or public vulnerability-disclosure programs.*
