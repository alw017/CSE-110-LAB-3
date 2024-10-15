import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import './App.css';
import { NoteGrid } from "./NoteGrid";
import { useEffect, useState } from "react";
import { themes, ThemeContext } from "./ThemeContext";

var count = dummyNotesList.length + 1;

export function StickyNotes() {
    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: count,
        title: "",
        content: "",
        label: Label.personal as Label,
        favorite: false,
    };
    const [createNote, setCreateNote] = useState(initialNote);

    function createNoteHandler( e :React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const currTitle = document.getElementById("note-title") as HTMLInputElement;
        const currContent = document.getElementById("note-content") as HTMLTextAreaElement;
        var currLabel = document.getElementById("note-selector") as HTMLInputElement;
        setNotes(notes.concat(createNote));
        console.log(notes);
        console.log(createNote);
        setCreateNote({...initialNote, id: ++count, title:currTitle.value, content:currContent.value, label:stringToLabel(currLabel.value)});
    }

    function handleNoteFavorites(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:number) {
        //console.log("clicked " + id);

        var clickedNote = notes.find((note)=>{return note.id === id}) as Note;
        clickedNote.favorite = !clickedNote.favorite;
        setNotes(Array.from(notes));

        const clicked = event.target as HTMLButtonElement;
        clicked.style.color = clickedNote.favorite ? "#ff0000" : "grey";
    }

    function handleEditField(e : React.FormEvent<HTMLElement>, type: string, id:number) {
        var clickedNote = notes.find((note)=>{return note.id === id}) as Note;
        if (type === "heading") {
            var element = e.target as HTMLHeadingElement;
            if (element.innerText === "") {
                element.innerText = clickedNote.title;
            } else {
                clickedNote.title = element.innerText;
            }
        } else if (type === "text") {
            element = e.target as HTMLParagraphElement;
            if (element.innerText === "") {
                element.innerText = clickedNote.content;
            } else {
                clickedNote.content = element.innerText;
            }
        } else {
            element = e.target as HTMLParagraphElement;
            if (element.innerText === "personal" || element.innerText === "work" || element.innerText === "study" || element.innerText === "other") {
                clickedNote.label = stringToLabel(element.innerText);
            } else {
                element.innerText = clickedNote.label;
            }            
        }
        setNotes(Array.from(notes));
    }

    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        document.body.style.backgroundColor = currentTheme === themes.light ? themes.dark.background : themes.light.background;
        setCurrentTheme(currentTheme === themes.light ? themes.dark: themes.light);
    };

    function deleteNoteHandler( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        //setNotes(notes.filter((note)=>{note.id == id}));
        setNotes(notes.filter((note) => {return note.id !== id}));
        console.log(notes);
    }



    useEffect(()=> { // work around for setters being asynchronous.
        if (createNote.id !== -1) {
        }
    }, [createNote.id])

    function stringToLabel(s:string) {
        switch(s) {
            case "personal":
                return Label.personal;
            case "work":
                return Label.work;
            case "study":
                return Label.study;
            default:
                return Label.other;
        }
    }

  return (
    <ThemeContext.Provider value={currentTheme}>
        <div style={{background:currentTheme.background, color:currentTheme.text}}className="app-container">
            <div className="info-bar-container">
                <form className="note-form" onSubmit={createNoteHandler}>
                    <div>
                        <input id="note-title" placeholder="Note Title" onChange={(event)=>{setCreateNote({ ...createNote, title: event.target.value})}} required></input>
                    </div>
                    <div>
                        <textarea id="note-content" placeholder="Note Content" onChange={(event)=>setCreateNote({ ...createNote, content: event.target.value})}></textarea>
                    </div>
                    <select id="note-selector" name="note" onChange={(event)=>setCreateNote({...createNote, label: stringToLabel(event.target.value)})} required>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.other}>Other</option>
                    </select>
                    <div><button type="submit">Create Note</button></div>
                </form>
                <div className="theme-toggle">
                    <button onClick={toggleTheme}> Toggle Theme </button>
                </div>
            </div>
            <div className="grid-container">
                <NoteGrid deleteNote={deleteNoteHandler} handleEditField={handleEditField} handleNoteFavorites={handleNoteFavorites} inputNotes={notes}/>
            </div>
        </div>
        <div data-testid={"favorite-list"} style={{color:currentTheme.text}}id="favoriteNotes"><h2>List of Favorites:</h2></div>
    </ThemeContext.Provider>
  );
}
