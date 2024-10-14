import { Label } from "./types"


export const dummyNotesList = [
    {
        id: 1,
        title: "CSE 110 Lecture 1",
        content: "dummy content 1",
        label: Label.other,
        favorite: false,
    },
    {
       id: 2,
       title: "Note Title",
       content: "Note Content",
       label: Label.study,
        favorite: false,
   },
   {
       id: 3,
       title: "test note 3 title",
       content: "test note 3 content",
       label: Label.work,
        favorite: false,
   },
   {
       id: 4,
       title: "test note 4 title",
       content: "test note 4 content",
       label: Label.study,
        favorite: false,
   },
   {
       id: 5,
       title: "test note 5 title",
       content: "test note 5 content",
       label: Label.study,
        favorite: false,
   },
   {
       id: 6,
       title: "test note 6 title",
       content: "test note 6 content",
       label: Label.work,
        favorite: false,
   },
]

export const dummyGroceryList = [
    {name: "Apples", isPurchased: false},
    {name: "Bananas", isPurchased: false}
]