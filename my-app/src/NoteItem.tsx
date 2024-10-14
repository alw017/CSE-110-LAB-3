import { Label } from "./types";

export function Note(note: { id: number, title:string, content:string, label:string}) {
    const testID = "testbutton";
    return (
        <div
        key={note.id}
        className="note-item">
        <div className="notes-header">
            <button data-testid={testID}>x</button>
        </div>
        <h2> {note.title} </h2>
        <p> {note.content} </p>
        <p> {note.label} </p>
        </div>
    )
}