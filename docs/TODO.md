- Add popup to add entries (currently routes to a separate page)
    - Then have it support edits
- Add reviews
    1. 0 or 1 per entry
    2. New table
    3. /add/entry
    4. /view/entry
    5. Click to expand in diary
    6. Far down the line: WYSIWYG editing / ability to include images
- Implement search page
- Add other-site webscraping
    - Automatically capture metadata and add thing
        - mangaupdates
        - Letterboxd
        - YouTube
    - Extern link for more information (part of thing page)
    - Brainstorm displaying some metadata (e.g. genre, maker, crew, etc)
    - Search other sites for media
    - Note: this precludes ever making this public since that would probably touch their target markets
- Minor
    - Line up scores in the entries view
- Non-breaking nice-to-have metadata
    - Add poster/image?
        - Doesn't quite line up with the rest of the aesthetic, maybe omit
    - Add maker (major associated names: director, mangaka, etc.)
    - Add tags (arbitrary)
    - Add genres 
- Add type (e.g. novel, manga, TV, movie, etc.)
    - Open question: Should this actually be a media type, or should it be bound to providers? It's just going to be filled in from the provider anyways, so converting to type early is just losing information. That also adds an ability to associate links. On the flip side, there could be multiple providers, so this should just be another added table, which also allows for inference and/or manual input.
- Have entries support segments of things (e.g. chapters 1-50)
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
- Brainstorm alternative space-efficient display
    - Segments probably need to leak to next row
    - Images allow for a grid and are compact
        - Segments won't be displayed, which may be fine
        - Not all media will have a clean image, and images will be nonstandard
            - Games vs. manga have different ratios
            - Niche things & experiences won't have any image unless I upload one
    - Text-based grid won't work - too much horizontal eye movement
    - List view is still useful, esp if it adds a sidebar where I can read information