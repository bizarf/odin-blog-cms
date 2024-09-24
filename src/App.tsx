import "./App.css";
import Router from "./Router";

const App = () => {
    return (
        // set the app container to a minimum height 100% to allow the div to take up the rest of the space. a must have for the dark mode background colour
        <div className="flex min-h-full flex-col dark:bg-slate-600">
            <Router />
        </div>
    );
};

export default App;
