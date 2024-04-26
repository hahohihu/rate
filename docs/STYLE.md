# Summary
This document describes the thinking behind parts of the styling.

# Colors
Most of the colors should probably all be in the same palette at varying levels of lightness, to let the ratings and brand colors pop out.

## Foreground Colors
These are the colors of the things I'll be reading / trying to get something out of. They should guide the user experience. They're ordered by how eye-catching they should be.

### Brand:
	Exceptional color for emphasis on a few exceptional items
	Also used for highlights and flavor, e.g. currently selected

### LATER - Warning:
	Exceptional color for emphasis on potentially dangerous items (e.g. deleting content).
	Not currently used since deletion isn't implemented.

### Dominant:
	Mainly titles, since they're the focus

### Hover:
	A consistent on-hover color for most cases.

### LATER - Secondary:
	The need hasn't been hit yet since links / buttons are fairly obvious from context, but there will eventually be a need to add colors between Dominant and Ordinary, especially in cases where they're adjacent.

### Ordinary: 
	Most common, middle ground that's easily readable but not too eye-catching.
	e.g. text, section labels, minor metadata, dividers

### Reach: 
	They know if they want it, so it should be in the background.
	e.g. dates, metadata (watch time), etc.

## Background Colors
This is the color of the backgrounds of the overall page, headers, inputs, etc. Due to the choice to make ratings colored, the main background needs to be plain and relatively dark, and things above it should be lighter. These are just the same palette ordered from most to least dark. 
- Bottom: Main background.
- Middle: Things above bottom but still lower than top. 
- Top: Header.
- Fly: Things above top - popups, disabled searches, etc.

	