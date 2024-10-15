import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";
import userEvent from "@testing-library/user-event";

describe("Create StickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });
});

describe("Read Sticky Note", () => {
    test("renders a note", () => {
        render(<StickyNotes />);
        
        for (let i = 0; i < dummyNotesList.length; i++) {
            const noteTitle = screen.getByText(dummyNotesList[i].title);
            const noteContent = screen.getByText(dummyNotesList[i].content);
            expect(noteTitle).toBeInTheDocument();
            expect(noteContent).toBeInTheDocument();
        }
    });
});

describe("Update Sticky Note", () => {
    test( "Update note ", () => {
        render(<StickyNotes />);
        const noteTitle = screen.getByText("CSE 110 Lecture 1");
        const noteContent = screen.getByText("dummy content 1");
        const noteLabel = screen.getByText("other");
        
        fireEvent.input(noteTitle, { target: { textContent: "Unit Title" } });
        fireEvent.input(noteContent, { target: { textContent: "Unit Content" } });
        fireEvent.input(noteLabel, { target: { textContent: "personal" } });

        expect(screen.getByText("Unit Title")).toBeInTheDocument();
        expect(screen.getByText("Unit Content")).toBeInTheDocument();
        expect(screen.getByText("personal")).toBeInTheDocument();
    });

    test("invalid note type input is rejected", () => {
        render(<StickyNotes/>);
        
        const noteTitle = screen.getByText("CSE 110 Lecture 1");
        const noteContent = screen.getByText("dummy content 1");
        const noteLabel = screen.getByText("other");
        
        fireEvent.input(noteTitle, { target: { textContent: "Unit Title" } });
        fireEvent.input(noteContent, { target: { textContent: "Unit Content" } });
        
        fireEvent.focus(noteLabel);
        fireEvent.keyDown(noteLabel, {key: 'A', code:"keyA"});
        fireEvent.blur(noteLabel);

        expect(screen.getByText("Unit Title")).toBeInTheDocument();
        expect(screen.getByText("Unit Content")).toBeInTheDocument();
        expect(screen.getByText("other")).toBeInTheDocument();
    })
});

describe("Delete Sticky Note", () => {
    test("Delete note", () => {
        render(<StickyNotes />);

        fireEvent.click(screen.getByTestId("test-button1"));
        expect(screen.queryByText("CSE 110 Lecture 1")).toBeNull();

        fireEvent.click(screen.getByTestId("test-button2"));
        expect(screen.queryByText("Note Title")).toBeNull();
    })

    test("Delete all notes", () => {
        render(<StickyNotes/>);
        for (let i = 1; i <= dummyNotesList.length; i++) {
            fireEvent.click(screen.getByTestId("test-button"+i));
        }

        const notesContainer = screen.getByTestId("notes-container");
        expect(notesContainer.children.length).toBe(0);
    })

    test("Deleting favorited note updates the favorites list", () => {
        render(<StickyNotes/>);
        const favoriteButton = screen.getByTestId("test-fav1");
        fireEvent.click(favoriteButton);
        const favoriteList = screen.getByTestId("favorite-list");
        expect(within(favoriteList).getByText("CSE 110 Lecture 1")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("test-button1"));
        expect(within(favoriteList).queryByText("CSE 110 Lecture 1")).toBeNull();
    })
});
        
