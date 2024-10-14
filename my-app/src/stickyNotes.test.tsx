import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constants";
import userEvent from "@testing-library/user-event";
import { get } from "http";

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
    })
});

/*describe("Delete Sticky Note", () => {
    test("Delete note", () => {
        render(<StickyNotes />);

        fireEvent.click(screen.getAllByTestId("testbutton")[0]);
        expect(screen.queryByText("CSE 110 Lecture 1")).toBeNull();
    })
});
  */      
        
