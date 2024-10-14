import { dummyNotesList } from "./constants"
import { useContext, useEffect } from "react"
import { ThemeContext } from "./ThemeContext";

export function NoteGrid( 
    { deleteNote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {}, 
      handleNoteFavorites = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id:number) => {}, 
      handleEditField = (event: React.FormEvent<HTMLElement>, type:string, id:number) => {},
      inputNotes = dummyNotesList } ) {
    useEffect(()=>{
        console.log("updating...")
        const element = document.getElementById("favoriteNotes") as HTMLElement;
        var output : string = `<h2>List of Favorites:</h2>`;
        for (var i = 0; i < inputNotes.length; i++) {
            if(inputNotes[i].favorite) {
                output += `<p>`+ inputNotes[i].title + `<p>`;
            }
        }
        element.innerHTML = output;
    },[inputNotes])
    
    const theme = useContext(ThemeContext);
    return (
        <div className="notes-grid">
          {inputNotes.map((note) => (
            <div style={{ background: theme.background, color:theme.text}}
            key={note.id}
            className="note-item">
            <div className="notes-header">
                <div className="favorite-button">
                    <button style={{color:"grey"}} onClick={(e) => handleNoteFavorites(e, note.id)}>❤</button>
                </div>
                <button style={{color:theme.text}} onClick={(e) => {deleteNote(e, note.id)}}>x</button> 
            </div>
            <h2 suppressContentEditableWarning={true} contentEditable="true" onBlur={(e)=>handleEditField(e, "heading", note.id)}> {note.title} </h2>
            <p suppressContentEditableWarning={true} contentEditable="true" onBlur={(e)=>handleEditField(e, "text", note.id)}> {note.content} </p>
            <p suppressContentEditableWarning={true} contentEditable="true" onBlur={(e)=>handleEditField(e, "label", note.id)}> {note.label} </p>
            </div>
          ))}
        </div>
    ) 
}