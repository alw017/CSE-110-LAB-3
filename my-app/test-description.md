# Create Sticky Note

## Create note form is rendered
This test makes sure that the "Create Note" button in the form section of the website is rendered on screen.

## Creates a new note
This test fills out the form section of the sticky notes page, simulates a click to create a new note, and verifies that the content and title correctly match the form content.

# Read Sticky Note

## Renders all notes
This test checks that all notes in the dummyNotesList are rendered when the StickyNotes page is initially loaded.

# Update Sticky Note

## Updated note is rendered
This test checks that when a user changes the information in a contentEditable element, that the resulting text in the respective elements updates correctly to reflect each change.

# Delete Sticky Note

## Deleted notes are no longer rendered

This test deletes two notes, specifically the two titles "CSE 110 Lecture 1" and "Note Title", and makes sure that they are no longer rendered after being deleted.

## Delete all notes, no notes are rendered

This test deletes all notes, and then makes sure that there are no rendered elements in the html element that contains all notes.

## Deleting favorited note updates the favorites list

This test favorites a note, checks that the favorites list update to include the favorited note title, and then deletes the note, and makes sure that the favorited note title is no longer in the list. 