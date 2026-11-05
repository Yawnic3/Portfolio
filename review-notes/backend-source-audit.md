# Backend portfolio source audit

Read-only review; no application repositories changed.

## Sources
- NoteShare: C:/Users/qingy/OneDrive/Desktop/Digital Projects/studynotesdatabase/main_app (remote: noted-io/main_app). Next.js 15, Clerk middleware, Svix-verified identity webhook, Mongoose user model, cached connection/promise. No uploaded-document API or custom indexes in reviewed source.
- Chomp Change: public Yawnic3/MoneyPoolApp main checked via GitHub API/raw source. Express routers with protected user/pool/transaction routes; custom HMAC-SHA256 token authority (not JWT); schemas for users, pools, transactions. Local checkout contains merge markers and differs from main; it was not modified. Controller and DAO behavior inspected locally where consistent with verified routes and token implementation.

## Metric attribution from supplied resume
- CourseConnect: 2,000+ active students; 40% average Firestore query-latency reduction.
- Chomp Change: 35% average MongoDB query-latency reduction over 1,000+ seeded records; resume mentions compound indexing, not present in verified schema snapshot.
- NoteShare: 33% initial-load reduction via client caching, pagination, reusable hooks; those mechanisms not found in inspected snapshot.

## User-supplied metrics retained pending attribution / source confirmation
- Approximately 1,000 users.
- Approximately 40% database indexing/query improvement.
- Approximately 85% fewer authentication-related errors.
- Approximately 60% shorter reload times.
These were not removed from the record or reassigned to a different project. They are withheld from public case studies because the user required source-backed implementations and asked to use resume attribution; that resume does not contain these exact project metrics.

No claims of Docker/Linux deployment, distributed caching, general RBAC, file processing, transactional consistency, or standalone service tiers were added without implementation evidence.
