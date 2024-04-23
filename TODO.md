- Split up entries and objects (e.g. watching vs. movie)
    1. Modify DB + seed but otherwise identical to status quo
    2. Split up the add page into (add object) > (add entry)
    3. Add a page for objects
    4. Add a page for entries
    5. Link towards those pages in other pages
- Have entries support segments of objects (e.g. chapters 1-50)
    1. Effectively just an associated range + unit
        - How to handle volumes + chapters?
            - Model as tuples of (range, unit)
            - Volume 2 - volume 2 or volume 2 - null?
    2. Support any number >= 0
        - 0 -> entire thing
        - 2 -> e.g. volume, chapter
    3. Parse (easier than UI)
        - v2 c10-20
        - s1 e1-5
        - s1e1 - s2e5
        - segment -> <edge> - <edge>
        - edge -> <alpha>+ <num>+ [ <edge>]
        - edge -> <empty>
        - edge LHS must be >= RHS
        - each additional edge on the left of the LHS is interpreted as a collapsed segment
- Add other-site webscraping
    - Automatically capture metadata and add object
        - mangaupdates
        - Letterboxd
        - YouTube
    - Extern link for more information (part of object page)
    - Brainstorm displaying some metadata (e.g. genre, maker, crew, etc)
    - Note: this precludes ever making this public since that would probably touch their target markets
- Brainstorm alternative space-efficient display
    - Segments probably need to leak to next row
    - Images allow for a grid and are compact
        - Segments won't be displayed, which may be fine
        - Not all media will have a clean image, and images will be nonstandard
            - Games vs. manga have different ratios
            - Niche things & experiences won't have any image unless I upload one
    - Text-based grid won't work - too much horizontal eye movement
    - List view is still useful, esp if it adds a sidebar where I can read information
- Rework font choices
    - Restyle month, date, name