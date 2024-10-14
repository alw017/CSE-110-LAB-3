import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get } from "http";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

describe("Read Items", () => {
    test("renders a list of items", () => {
        render(<ToDoList />);
    
        for (let i = 0; i < dummyGroceryList.length; i++) {
        const item = screen.getByText(dummyGroceryList[i].name);
        expect(item).toBeInTheDocument();

        const checkbox = screen.getAllByRole("checkbox")[i];
        expect(checkbox).not.toBeChecked();
        }
    });
});

describe("Check Items", () => {
    test("Check items in list", async () => {
        render(<ToDoList />);
        
        for (let i = dummyGroceryList.length-1; i >= 0; i++) {
            const checkbox = screen.getAllByRole("checkbox")[i];
            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
        }
        
    });

    test("Number of checked items", async () => {
        render(<ToDoList />);
        
        
        const numCheckedItems = 0;
        
        const itemsBought = screen.getByText(`Items bought: ${numCheckedItems}`);
        expect(itemsBought).toBeInTheDocument();
    });
});