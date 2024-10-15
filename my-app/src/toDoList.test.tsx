import { render, screen, fireEvent } from "@testing-library/react";
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
    test("Check items in list", () => {
        render(<ToDoList />);
        
        const checkboxList = screen.getAllByRole("checkbox");
        let v = checkboxList[0] as HTMLInputElement;
        console.log(v.checked);
        
        fireEvent.change(v, {target: {checked: true}});
        
        const updatedList = screen.getAllByRole("checkbox");
        let x = updatedList[0] as HTMLInputElement;
        console.log(x.checked);
    });

    test("Number of checked items", () => {
        render(<ToDoList />);

        // 0 items
        const itemsBought = screen.getByText(`Items bought: 0`);
        expect(itemsBought).toBeInTheDocument();

        // 1 item
        const checkboxList = screen.getAllByRole("checkbox");
        //fireEvent.change(checkboxList[0], {target: {checked: true}});
        fireEvent.click(checkboxList[0]);

        const oneBought = screen.getByText(`Items bought: 1`);
        expect(oneBought).toBeInTheDocument();

        fireEvent.click(checkboxList[0]);

        expect(screen.getByText(`Items bought: 2`)).toBeInTheDocument();
    });
});